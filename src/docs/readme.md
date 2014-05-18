# Extended Documentation

## Documentation Directory
* [FOAF (Friend-of-a-Friend) Ontology and RDF + WebID](foaf.md)
* [WAI-ARIA Roles, States, and Properties](wai_aria.md)

## Misc Resources
* ASCII, UTF-8 Resources
	* [Wiki Arrows in Unicode](http://en.wikipedia.org/wiki/Arrow_%28symbol%29#Arrows_in_Unicode)
	* [Wiki Geometric Shapes in Unicode](http://en.wikipedia.org/wiki/Geometric_Shapes)

"SlideMe" shows how to implement the iPhone sliding behavior using multi-touch events and CSS transform properties. It displays a red knob, horizontal bar, and "iPhone" string. Tap the red knob to turn it green, move it to turn it yellow and magnify the "iPhone" string, and lift your finger to turn it back to red.
https://developer.apple.com/library/safari/#samplecode/SlideMe/Introduction/Intro.html#//apple_ref/doc/uid/DTS40008017

Media Queries

http://www.stephentgilbert.com/mediaqueries/

iPhone 5 Resolution
Screen Width = 320px (CSS Pixels)
Screen Height = 568px (CSS Pixels)
Screen Width = 640px (Actual Pixels)
Screen Height = 1136px (Actual Pixels)
Device-pixel-ratio: 2

iPhone 4/4S Resolution
Screen Width = 320px (CSS Pixels)
Screen Height = 480px (CSS Pixels)
Screen Width = 640px (Actual Pixels)
Screen Height = 960px (Actual Pixels)
Device-pixel-ratio: 2

iPhone 2G/3G/3GS Resolution
Screen Width = 320px (CSS Pixels)
Screen Height = 480px (CSS Pixels)
Screen Width = 320px (Actual Pixels)
Screen Height = 480px (Actual Pixels)
Device-pixel-ratio: 1


iPad mini, iPad 1 & 2 Resolution
Screen Width = 768px (CSS Pixels)
Screen Height = 1024px (CSS Pixels)
Screen Width = 768px (Actual Pixels)
Screen Height = 1024px (Actual Pixels)
Device-pixel-ratio: 1

Retina iPad Resolution
Screen Width = 768px (CSS Pixels)
Screen Height = 1024px (CSS Pixels)
Screen Width = 768px (Actual Pixels)
Screen Height = 1024px (Actual Pixels)
Device-pixel-ratio: 1

Usable resolution:
retina iPad, safari, landscape: 2048 X 1344 (1024 X 672)
retina iPad safari, portrait: 1536 X 1856 (768 X 928)
retina iPad, chrome, landscape: 2048 X 1344
retina iPad safari, portrait: 1536 X 1856

function isIPad(){
    return navigator.platform == "iPad";
}
landscape 1/3: 340, /4 = 168, ratio = 0.494
portrait 1/3: 256, /8 = 116, ratio = 0.453




All iPads in portrait & landscape
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px)  {
}

All iPads in landscape
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape) {
}

All iPads in portrait
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait) {
}

Retina iPad in portrait & landscape
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (-webkit-min-device-pixel-ratio: 2) {
}

Retina iPad in landscape
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape) and (-webkit-min-device-pixel-ratio: 2) {
}

Retina iPad in portrait
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait) and (-webkit-min-device-pixel-ratio: 2) {
}

ipad Mini, iPad 1 & 2 in portrait & landscape
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (-webkit-min-device-pixel-ratio: 1){
}

ipad Mini, iPad 1 & 2 in landscape
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape) and (-webkit-min-device-pixel-ratio: 1)  {
}

ipad Mini, iPad 1 & 2 in portrait
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait) and (-webkit-min-device-pixel-ratio: 1) {
}

iPhone 5 in portrait & landscape
@media only screen and (min-device-width : 320px) and (max-device-width : 568px) {}

iPhone 5 in landscape
@media only screen and (min-device-width : 320px) and (max-device-width : 568px) and (orientation : landscape) {}

iPhone 5 in portrait
@media only screen and (min-device-width : 320px) and (max-device-width : 568px) and (orientation : portrait) {}

iPhone 2G, 3G, 4, 4S Media Queries
@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {}

iPhone 2G-4S in landscape
@media only screen and (min-device-width : 320px) and (max-device-width : 480px) and (orientation : landscape) {}

iPhone 2G-4S in portrait
@media only screen and (min-device-width : 320px) and (max-device-width : 480px) and (orientation : portrait) {}








