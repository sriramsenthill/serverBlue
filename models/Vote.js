const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema({
    token: { type: String, }, // Include this line for the token field
    metamaskID: { type: String, unique: true, required: true },
    hasLogged: { type: Boolean },
    isVoted: { type: Boolean },
    totalVotes: { type: Number }
});

const Vote = mongoose.model("Vote", VoteSchema);

module.exports = Vote;