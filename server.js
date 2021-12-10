const db = require("./db/index");

//add user to db
async function addUser(name) {
  try {
    let { rows } = await db.query("select * from users where name = $1;", [
      name,
    ]);
    if (rows.length > 0) {
      console.log("user already exists - try logging in");
    } else {
      await db.query("insert into users(name) values($1);", [name]);
      console.log(name + " created");
    }
  } catch (err) {
    console.error(err);
  }
}

//get user w/ username from db
async function getUser(name) {
  try {
    let { rows } = await db.query("select * from users where name=$1;", [name]);
    if (rows.length > 0) {
      return rows[0];
    } else {
      console.log("user not found.");
      return -1;
    }
  } catch (err) {
    console.error(err);
  }
}

//create a relationship b/w the users w/ given usernames
async function friendReq(from, to) {
  try {
    let fromFriend = await getUser(from);
    let toFriend = await getUser(to);

    if (toFriend !== -1 && fromFriend !== -1) {
      let friendReq = await db.query(
        "select * from friends where user1 in ($1,$2) and user2 in ($1,$2);",
        [fromFriend.id, toFriend.id]
      );
      if (friendReq.rows.length > 0) {
        console.log("y'all already friends, yeesh");
        return;
      }

      let {
        rows,
      } = await db.query("insert into friends(user1, user2) values($1, $2);", [
        fromFriend.id,
        toFriend.id,
      ]);

      console.log(rows);
    } else {
      console.error("can't friend req:");
      console.error("user(s) not found");
    }
  } catch (err) {
    console.error(err);
  }
}

async function getFriends(name) {
  try {
    let user = await getUser(name);
    let {
      rows,
    } = await db.query("select * from friends where user1=$1 or user2=$1;", [
      user.id,
    ]);

    console.log(rows);
    let friendIds = rows.map((relation) => ({
      id: relation.user1 !== user.id ? relation.user1 : relation.user2,
    }));

    let friends = [];
    for (let i = 0; i < friendIds.length; i++) {
      let { rows } = await db.query("select name from users where id = $1", [
        friendIds[i].id,
      ]);
      friends.push(rows[0]);
    }

    // console.log(friends);
  } catch (err) {
    console.error(err);
  }
}

async function createQueue(name, from, to) {
  try {
    let fromUser = await getUser(from);
    let toUser = await getUser(to);
    if (!fromUser || !toUser) {
      console.error("couldn't create queue — user not found");
      return;
    }
    let {
      rows,
    } = await db.query(
      "select * from queues where recipient = $1 and sender = $2 and queue_name = $3",
      [toUser.id, fromUser.id, name]
    );
    if (rows.length == 0) {
      await db.query(
        "insert into queues(queue_name, recipient, sender) values ($1, $2, $3);",
        [name, toUser.id, fromUser.id]
      );
    } else {
      console.log(`queue ${name} already exists`);
    }
  } catch (err) {
    console.log("unable to create queue: ");
    console.error(err);
  }
}

async function addToQueue(song, artist, queue_name, from, to) {
  //check if queue exists in from->for
  try {
    let fromUser = await getUser(from);
    let toUser = await getUser(to);
    if (!fromUser || !toUser) {
      console.error("couldn't create queue — user not found");
      return;
    }
    let { rows: qRows } = await db.query(
      `select * from queues where 
      recipient=$1 and
      sender=$2 and
      queue_name=$3;`,
      [toUser.id, fromUser.id, queue_name]
    );
    if (qRows.length < 1) {
      console.log(`queue ${queue_name} not found - creating now`);
      await createQueue(queue_name, from, to);
      let { rows: qRows } = await db.query(
        //redundant - need function that gets queue
        `select * from queues where 
      recipient=$1 and
      sender=$2 and
      queue_name=$3;`,
        [toUser.id, fromUser.id, queue_name]
      );
    }
    // console.log(qRows);
    // console.log(`adding ${song} to ${queue_name}...`);
    // need to check out duplicate key id when inserting same song 2x.
    // probably shouldn't do this with manual queue_id
    await db.query(
      "insert into queue_contents(queue_id, song_name, song_artist) values ($1, $2, $3);",
      // *** this reassignment doesn't seem to work
      [qRows[0].queue_id, song, artist]
      //also this doesn't work when the queue is being created.
      //specifically ***
    );
    console.log("added.");
  } catch (err) {
    console.error(err);
  }
}

async function printQueue(name, to, from) {
  try {
    //good GOD i need a getUserId function
    let fromUser = await getUser(from);
    let toUser = await getUser(to);
    if (!fromUser || !toUser) {
      console.error("couldn't create queue — user not found");
      return;
    }
    let {
      rows: qRows,
    } = await db.query(
      "select * from queues where queue_name=$1 and recipient=$2 and sender=$3;",
      [name, toUser.id, fromUser.id]
    );

    if (qRows.length == 0) {
      console.log(`queue ${name} not found`);
      return;
    }

    let {
      rows: songRows,
    } = await db.query(
      "select song_name, song_artist from queue_contents where queue_id=$1;",
      [qRows[0].queue_id]
    );

    console.log(songRows);
  } catch (err) {
    console.error(err);
  }
}

async function main() {
  // friendReq("harmoocifer", "natashia");
  // getFriends("natashia");
  // createQueue("bad songs xD", "jared", "natashia");
  addToQueue(
    "arstneio",
    "arstneio guy",
    "i love u let's get a cat",
    "jared",
    "natashia"
  );
  printQueue("i love u let's get a cat", "natashia", "jared");
}

main();
