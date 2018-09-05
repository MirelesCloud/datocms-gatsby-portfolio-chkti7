import React from 'react'
import Link from 'gatsby-link'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const StoreLocation = withScriptjs(withGoogleMap((props) =>{
  return (
      <GoogleMap
        defaultZoom={14}
        center={ { lat:  33.8726562, lng: -118.37192090000002 } }
      >

      </GoogleMap>
    );
  }
))

const Location = ({ data: { location } }) => (
  <article className="sheet">
    <HelmetDatoCms seo={location.seoMetaTags} />
    <div className="sheet_inner">
      <h1 className="sheet__title">{location.title}</h1>
      <p className="sheet__lead">{location.subTitle}</p>
    </div>
    <div className="sheet__body">
      <StoreLocation
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDhq6DDmH0nylqeC3vifVoSyWrUmRFj_7U&v=3.exp&libraries=geometry,drawing,places`}
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `600px`, width: `600px` }} />}
				mapElement={<div style={{ height: `100%` }} />}
			/>

  </div>
  </article>
)

export default Location

export const query = graphql`
  query LocationQuery {
    location: datoCmsLocationPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      subTitle
      storeLocation {
        latitude
        longitude
      }
    }
  }
`
