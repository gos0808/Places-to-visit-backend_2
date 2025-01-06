const {Router} = require('express');
const router = Router();
const {getPlaces, savePlace, deletePlace, editPlace} = require('./PlaceController')

router.get('/', getPlaces)

router.post('/savePlace', savePlace)

router.delete('/deletePlace/:_id', deletePlace)

router.put('/editPlace', editPlace)


module.exports = router;