var myDynamicManifest =  {
    "theme_color": "#642DFF",
    "background_color": "#ffffff",
    "display": "standalone",
    "scope": loc,
    "start_url": loc,
    "name": "Top gifts!",
    "short_name": "Top gifts!",
    "description": "Be the first to know about new drawings for top gifts!",
    "icons": [
        {
            "src": origin + "/" + mydir + "icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any maskable"
        },
        {
            "src": origin + "/" + mydir + "icon-256x256.png",
            "sizes": "256x256",
            "type": "image/png"
        },
        {
            "src": origin + "/" + mydir + "icon-384x384.png",
            "sizes": "384x384",
            "type": "image/png"
        },
        {
            "src": origin + "/" + mydir + "icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ]
}


const stringManifest = JSON.stringify(myDynamicManifest);
const blob = new Blob([stringManifest], {type: 'application/json'});
const manifestURL = URL.createObjectURL(blob);
document.querySelector('#my-manifest-placeholder').setAttribute('href', manifestURL);

var link = document.createElement('Link');
link.rel = "manifest";
link.setAttribute('href', 'data:application/json;charset=8' + stringManifest)
