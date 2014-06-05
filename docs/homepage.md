# Documentation for Home Page

### `<HEAD />` Header 
* Remember that Character encoding must appear within first 512 bytes of page:
  [http://www.w3.org/TR/xhtml-rdfa-primer/#using-multiple-vocabularies](http://www.w3.org/TR/xhtml-rdfa-primer/#using-multiple-vocabularies)
* HTML5 does not support `<html version="HTML+RDFa 1.1">`
* **RDFa** is "Resource Description Framework in attributes," which is a way to apply metadata and semantics to a page.
    * **Primers** (at least read the first 4 links):
        * W3 References: **[W3 RDFa for HTML Authors](http://www.w3.org/MarkUp/2009/rdfa-for-html-authors)**, **[W3 RDFa Primer](http://www.w3.org/TR/xhtml-rdfa-primer/)**, **[W3 RDFa in HTML](http://www.w3.org/TR/rdfa-in-html/)**
        * [3kbo RDFa working example](http://blog.3kbo.com/2010/11/10/simple-html5-rdfa-example/) and [3kbo Wiki for RDFa](http://notes.3kbo.com/rdfa)
        * [Manu Sporny's RDFa Lite for Dummies](http://manu.sporny.org/2011/rdfa-lite/)
        * [Google Rich Snippets for People](http://support.google.com/webmasters/bin/answer.py?hl=en&answer=146646)
    * **Prefixes:**
        * The property `dc:title` is defined by `http://purl.org/dc/terms/title` Therefore, `dc:title` is called a Compact URL, aka CURIE, which is a representation of a URI from html prefix `prefix="dc: http://purl.org/dc/terms/"`

            ```html
            <section prefix="dc:http://purl.org/dc/terms/title" typeof="dc:BibliographicResource" resource="/anna_karenina/">
                <h1 property="dc:title">Anna Karenina</h1>
                <p property="dc:creator">Leo Tolstoy</p>
                <time property="dc:created">1878</time>
            </section>
            ```
            That is, if running a query against the RDFa, the resource `/anna_karenina/` has the title, "Anna Karenina", which was created by Leo Tolsty in 1878.

            ```xml
            @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
            @prefix dc: <http://purl.org/dc/terms/> .
            <http://example.com/anna_karenina/>
               rdf:type dc:BibliographicResource;
               dc:title "Anna Karenina";
               dc:creator "Leo Tolstoy";
               dc:created "1878" .
            ```
        * Prefixes can be added anywhere; the higher up the DOM tree, the more areas to which it applies.
        * All prefixes on this site, either in HTML or body:

            ```html
            Creative Commmons:      cc="http://creativecommons.org/ns#"
            Dublin Core Terms:      dc="http://purl.org/dc/terms/"
            DCMI Types:             dcmitype="http://purl.org/dc/dcmitype/"
            Geo Spatial:            geo="http://www.w3.org/2003/01/geo/wgs84_pos#"
            Facebook:               fb="http://ogp.me/ns/fb#"
            Friend of a Friend:     foaf="http://xmlns.com/foaf/0.1/"
            Open Graph:             og="http://ogp.me/ns#"
            Open Graph music:       og="http://ogp.me/ns/music#"
            Vcard:                  v="http://rdf.data-vocabulary.org/#"
            Bibliographic:          bibo="http://purl.org/ontology/bibo/" 
            W3 Ontology Language:   owl: http://www.w3.org/2002/07/owl#
            XML:                    xsd: http://www.w3.org/2001/XMLSchema#
            ```
            * [Bibliographic Ontology reference](http://uri.gbv.de/ontology/bibo/)
            * [W3 Web Ontoloty Language (OWL) Primer](http://www.w3.org/TR/owl2-primer/)
            * [Dublin Core Metadata Initiative](http://dublincore.org/)
            * [W3 VCard](http://www.w3.org/Submission/vcard-rdf/)
    * **Useful RDFa Tools and Apps:**
        * [Debug RDFa in HTML with mappings](http://rdfa.info/play/)
        * **[Watch RDFa visualization using dbpedia](http://www.visualdataweb.org/relfinder/relfinder.php)**
        * [W3 Established Good Ontologies](http://www.w3.org/wiki/Good_Ontologies)
        * [Test with Google Rich Snippets](http://www.google.com/webmasters/tools/richsnippets)
        * [W3 pyRDFa XML/JSON extraction](http://www.w3.org/2012/pyRdfa/)
        * [W3 RDFa Validation Tool](http://www.w3.org/RDF/Validator/)
        * [Convert RDF XML to TURTLE](http://www.rdfabout.com/demo/validator/index.xpd)
        * [Semantic Web Blog](http://semanticweb.com/)
    * **Open Graph RDFa and Facebook**
        * Facebook JSON via Graph, e.g., [https://graph.facebook.com/142652672557253](https://graph.facebook.com/142652672557253)
        * Linter is at [https://developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug)
        * [Documentation on Open Graph `prefix="og"` protocol](https://developers.facebook.com/docs/opengraphprotocol/)
        * curl `https://developers.facebook.com/tools/lint/?url=http%3A%2F%2Fherereadthis.com&format=json`
    * **FOAF (Friend of a Friend)** is a vocabulary for identifying people and their relationships to their works and other people. [Go to FOAF + WebID Docs](https://github.com/herereadthis/redwall/blob/master/docs/foaf.md)
* **Icons**
    * [Online favicon generation (.ICO format)](http://convertico.com)
    * [Icons for iOS (iPhone and iPad) at Apple Developers](http://developer.apple.com/library/ios/#documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)

### `<header role="banner" />` Header
* `role="banner"` is a WAI-ARIA Landmark Role. See the [documentation](https://github.com/herereadthis/redwall/blob/master/docs/wai_aria.md) )



