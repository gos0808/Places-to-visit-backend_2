const PlaceModel = require('./PlaceModel');

module.exports.getPlaces = async (req, res) => {
    const places = await PlaceModel.find();
    res.send(places);
};

module.exports.savePlace = async (req, res) => {
    try {
        const { name, province, description, image } = req.body;

        const maxPlaces = 100;
        const placeCount = await PlaceModel.countDocuments();
        if (placeCount >= maxPlaces) {
            return res.status(400).send({ error: 'Maximum number of places reached' });
        }

        const newPlace = await PlaceModel.create({ name, province, description, image });
        res.send(newPlace);
        console.log('Place added', name);


    } catch (error) {
        console.log('Error saving place:', error);
        res.status(500).send({ error: 'Server error' });
    }
};

module.exports.editPlace = async (req, res) => {
    const { _id, name, province, description, image } = req.body;
    try {
        const editedPlace = await PlaceModel.findByIdAndUpdate(_id, { name, province, description, image }, { new: true });
        res.send(editedPlace);
        console.log('Edited place with id and new name: ', _id, name);
    } catch (error) {
        res.status(500).send(`Error editing place: ${error.message}`);
    }
};

module.exports.deletePlace = async (req, res) => {
    const { _id } = req.params;
    try {
        const deletedPlace = await PlaceModel.findByIdAndDelete(_id, { deleted: true });
        res.send(deletedPlace);
        console.log(`Place marked as visited: ${_id}`);
    } catch (error) {
        res.status(500).send(`Error deleting place: ${error.message}`);
    }
};

