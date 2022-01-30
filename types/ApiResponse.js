"use strict";
class ApiResponse {
    constructor(error, msg, data) {
        this.isError = error;
        this.message = msg;
        this.data = data;
    }
    display() {
        console.log(`I am ${this.isError ? "" : "not"} an error`);
        console.log(this.message);
        console.log(this.data);
    }
}
const response = {
    status: 400,
    data: {
        names: [],
    },
};
const response1 = {
    status: 200,
    data: {
        names: ["john", "jared", "moosh"],
    },
};
new ApiResponse(response.status == 400, response.status == 400 ? "Omg response failed" : "Nice", response.data.names).display();
new ApiResponse(response1.status == 400, response1.status == 400
    ? "Sorry, failed to get those names for you"
    : "Got 'em!:", response1.data.names).display();
