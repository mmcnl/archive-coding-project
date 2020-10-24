## YOUR MISSION

Using the front-end framework of your choice (e.g. LitElement, React), take the output of the Archive.org Metadata API and render the contents as a webpage. The rendering should all be done client-side.

The page should have:
* Playable video
* Title
* Description
* Metadata key-value pairs (note that values can be single values or arrays)

Bonus! (not required):
* Get the identifier from a URL parameter to allow viewing of different items
* Show related Items (extra bonus: in a carousel!)
* Add unit tests
* Display reviews that people have left

You can use this page (https://archive.org/details/InformationM) as a design inspiration, but feel free to create your own design if you want. It can be much simpler but should have some styling, to demonstrate your knowledge of CSS.

The API endpoints are:
* Metadata (JSON): https://archive.org/metadata/InformationM
* Thumbnail image: https://archive.org/services/img/InformationM
* Related Items: https://be-api.us.archive.org/mds/v1/get_related/all/InformationM

The video can be embedded using an iframe tag with these attributes:
src="https://archive.org/embed/InformationM" width="640" height="480" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen

Note: "InformationM" is the unique identifier for this item. If you swap it for a different identifier, you'll see the metadata etc. of the corresponding item.

Deliverables:
* A zip file of the project, or a link to Github, public or private. (Remember that many email clients eat zip files for breakfast, so if sending a zip, test it out and/or share a link to it.)
* Step-by-step instructions on viewing the rendered page on a (preferably Mac) laptop
