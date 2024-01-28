const Vote = require("./models/Vote")
const crypto = require('crypto');

const generateRandomToken = () => {
    return crypto.randomBytes(32).toString('hex');
};


const vote = async (req, res) => {
    try {
        const { metamaskID } = req.body;

        // Check if the voter with the provided metamaskID exists
        let existingVoter = await Vote.findOne({ metamaskID });

        // If the voter doesn't exist, create a new one
        if (!existingVoter) {
            // Create a new voter with the provided metamaskID
            existingVoter = await Vote.create({ metamaskID });
        }

        // Check if the user already has a token
        if (existingVoter.token) {
            return res.status(400).json({ error: 'User has already voted' });
        }

        // Update fields: hasLogged, isVoted, totalVotes, generate a token
        await Vote.updateOne(
            { metamaskID },
            { $set: { hasLogged: true, isVoted: true, token: generateRandomToken() }, $inc: { totalVotes: 1 } }
        );

        return res.status(200).json({ message: 'Vote recorded successfully' });
    } catch (error) {
        console.error("Error recording vote:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};




const getTotalVotes = async (req, res) => {
    try {
        // Use aggregate to calculate the totalVotes across all documents
        const totalVotesResult = await Vote.aggregate([
            {
                $group: {
                    _id: null,
                    totalVotes: { $sum: "$totalVotes" }
                }
            }
        ]);

        // Extract the totalVotes from the result
        const totalVotes = totalVotesResult.length > 0 ? totalVotesResult[0].totalVotes : 0;

        return res.status(200).json({ totalVotes });
    } catch (error) {
        console.error("Error fetching total votes:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = { vote, getTotalVotes };
