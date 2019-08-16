var cors = require('cors');
const app = require("express")();
const stripe = require("stripe")("")

app.use(cors());
app.use(require("body-parser").text())

app.post("/charge", async (req, res) => {

    console.log("pick payments inside charge")
    try {
        console.log("get payments from stripe")
        let { status } = await stripe.charges.create({
            amount: 2000,
            currency: "usd",
            description: "An example charge",
            source: req.body
        });
        console.log(status);
        res.json({ status })
    }
    catch (err) {
        res.status(500).end();

    }
});

app.listen(9000, () => console.log("Listening on port 9000"))
