async function AddToCartController(req, res) {
    const { productId, quantity } = req.body;
    const userId = req.userId;

    try {
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).send({ message: 'send valid Product ID' });
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({ message: 'send valid User ID', success: false });
        }

        const checkUserPresent = await UserModel.findOne({ _id: userId });
        if (!checkUserPresent) {
            return res.status(401).send({ message: 'Un-Authorized please signup', success: false });
        }

        const checkIfProductPresent = await ProductModel.findOne({ _id: productId });
        if (checkIfProductPresent) {
            return res.status(400).send({ message: 'product already present in cart', success: false });
        }

        await CartModel.create({
            productId,
            quantity,
            userId,
        });

        return res.status(201).send({ message: 'product is successfully created', success: true });

    } catch (er) {
        return res.status(500).send({ message: er.message, success: false });
    }
}

async function GetProductForUser(req, res) {
    const userId = req.userId;

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(401).send({ message: 'un-Authorized please signup' });
        }
        const checkUserPresent = await UserModel.findOne({ _id: userId });
        if (!checkUserPresent) {
            return res.status(401).send({ message: 'un-Authorized please signup' });
        }

        const data = await CartModel.find({ userId });

        return res.send({ success: true, data });

    } catch (er) {
        return res.status(500).send({ message: er.message, success: false });
    }
}
