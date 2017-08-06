## URL Shortener API
A URL Shortener API service

### Demo
[Timestamp API](https://shorten-url-api.herokuapp.com)

#### How to:
Pass a valid URL to the endpoint ```api/url``` like so:
```
https://shorten-url-api.herokuapp.com/api/url/https://github.com/ofemeteng
```

#### Example output:
```javascript
{ "original_url": "https://github.com/ofemeteng", "short_url": "https://shorten-url-api.herokuapp.com/H1PsfDNv-" }
```
Usage: The generated short url ```https://shorten-url-api.herokuapp.com/H1PsfDNv-``` redirects to your original url ```https://github.com/ofemeteng```
