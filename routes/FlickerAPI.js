const router = require('express').Router()
const request = require('request')
const qs = require('query-string')

const FLICKR_API_KEY= '9a41f07944363a7bbd088bbe8bf52217';
const url = 'https://www.flickr.com/services/rest/?';

const baseURL = {
    method : 'flickr.photos.getRecent',
    api_key: FLICKR_API_KEY,
    format: 'json',
    nojsoncallback: '1',
    per_page: '50',
}

// GET Recent photos in home page.
router.get('/', function (req, res, next) {
    const { page } = req.query;
    const newURL = url + qs.stringify({ ...baseURL, page })
    request({ url: newURL, json: true }, function (request, response) {
        return res.json(response.body)
    })
});

// Get detail by photo_id params
router.get('/details', function (req, res, next) {
    const { photo_id } = req.query
    const newURL = url + qs.stringify({ 
        ...baseURL,
        ...{ method: 'flickr.photos.getInfo' }, 
        photo_id 
    });
    request({ url: newURL, json: true }, function (request, response) {
        return res.json(response.body)
    })
});

// Get Search by tags params
router.get('/search', function (req, res, next) {
    const { tags, page } = req.query;
    const newURL = url + qs.stringify({ 
        ...baseURL,
        ...{ method: 'flickr.photos.search' }, 
        tags, 
        page 
    });
    request({ url: newURL, json: true }, function (request, response) {
        return res.json(response.body)
    })
});

module.exports = router;