import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import '../styles/index.sass'

const StoreLocation = withScriptjs(withGoogleMap(() => {
  return (
      <GoogleMap
        defaultZoom={14}
        center={ { lat:  33.8726562, lng: -118.37192090000002 } }
      >
        <Marker position={ { lat:  33.8726562, lng: -118.37192090000002 } }/>
      </GoogleMap>
    );
  }
))

const Store = ({data}) => (
      <GoogleMap
        defaultZoom={14}
        center={{ lat: data.datoCmsLocationMap.storeLocation.latitude, lng: data.datoCmsLocationMap.storeLocation.longitude }}>
        <Marker position={{ lat: data.datoCmsLocationMap.storeLocation.latitude, lng: data.datoCmsLocationMap.storeLocation.longitude }}/>
      </GoogleMap>
)





const StoreMap = withScriptjs(withGoogleMap(Store))

const TemplateWrapper = ({ children, data }) => (
  <div className="container">
    <HelmetDatoCms
      favicon={data.datoCmsSite.faviconMetaTags}
      seo={data.datoCmsHome.seoMetaTags}
    />
    <div className="container__sidebar" >
      <div className="sidebar" >

        <div className="sidebar__title">
          <Img sizes={data.datoCmsHome.logoImage.sizes}/>

        </div>

        <div
          className="sidebar__intro"
          dangerouslySetInnerHTML={{
            __html: data.datoCmsHome.introTextNode.childMarkdownRemark.html,
          }}
        />
        <ul className="sidebar__menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/"></Link>
          </li>
        </ul>
        <p className="sidebar__social">
          {data.allDatoCmsSocialProfile.edges.map(({ node: profile }) => (
            <a
              key={profile.profileType}
              href={profile.url}
              target="blank"
              className={`social social--${profile.profileType.toLowerCase()}`}
            />
          ))}
        </p>
        <div className="sidebar__copyright">{data.datoCmsHome.copyright}</div>
      </div>

    </div>
    <div className="container__body">
      <div className="container__mobile-header">
        <div className="mobile-header">
          <div className="mobile-header__menu">
            <Link to="/" data-js="toggleSidebar" />
          </div>
          <div className="mobile-header__logo" >
            <Link to="/"><Img sizes={data.datoCmsHome.logoImage.sizes} /></Link>
          </div>
        </div>
      </div>
      {children()}
      <div className="sheet__map">

        <div className="sheet_inner">
          <div className="sheet__map__title">{data.datoCmsLocationMap.title}</div>
          <p className="sidebar__social">
            {data.allDatoCmsSocialProfile.edges.map(({ node: profile }) => (
              <a
                key={profile.profileType}
                href={profile.url}
                target="blank"
                className={`social social--${profile.profileType.toLowerCase()}`}
              />
            ))}
          </p>

          <div className="sheet__map__lead"
            dangerouslySetInnerHTML={{
              __html: data.datoCmsLocationMap.subTextNode.childMarkdownRemark.html,
            }}
          />

        </div>
        <div className="sheet__body">
          <StoreLocation
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDhq6DDmH0nylqeC3vifVoSyWrUmRFj_7U&v=3.exp&libraries=geometry,drawing,places`}
    				loadingElement={<div className="loading-element" />}
    				containerElement={<div className="container-element" />}
    				mapElement={<div style={{ height: `100%` }} />}
    			/>

        </div>
      </div>

    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper

export const query = graphql`
  query LayoutQuery {
    datoCmsSite {
      globalSeo {
        siteName
      }
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    datoCmsHome {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      introTextNode {
        childMarkdownRemark {
          html
        }
      }
      logoImage {
        sizes(maxWidth: 300, imgixParams: { fm: "png", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
      copyright

    }
    allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          profileType
          url
        }
      }
    }
    datoCmsLocationMap {
      title
      subTextNode {
        childMarkdownRemark {
          html
        }
      }
      storeLocation {
        latitude
        longitude
      }
    }
  }
`
