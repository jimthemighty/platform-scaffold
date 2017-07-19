/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'

import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'

const AddressBlock = ({
    firstname,
    lastname,
    addressLine1,
    addressLine2,
    city,
    countryId,
    postcode,
    telephone,
    regionId
}) => (
    <div className="u-padding-md">
        {firstname ?
            <p>{firstname} {lastname}</p>
            :
            <SkeletonText width="50%" style={{lineHeight: '20px', display: 'block'}} />
        }
        {addressLine1 ?
            <p>{addressLine1}</p>
            :
            <SkeletonText width="60%" style={{lineHeight: '20px', display: 'block'}} />
        }
        {addressLine2 &&
            <p>{addressLine2}</p>
        }
        {city ?
            <p>{city}, {regionId}, {postcode}</p>
            :
            <SkeletonText width="70%" style={{lineHeight: '20px', display: 'block'}} />
        }
        {countryId ?
            <p>{countryId}</p>
            :
            <SkeletonText width="40%" style={{lineHeight: '20px', display: 'block'}} />
        }
        {telephone ?
            <p>{telephone}</p>
            :
            <SkeletonText width="50%" style={{lineHeight: '20px', display: 'block'}} />
        }
    </div>
)

AddressBlock.propTypes = {
    addressLine1: PropTypes.string,
    addressLine2: PropTypes.string,
    city: PropTypes.string,
    countryId: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    postcode: PropTypes.string,
    regionId: PropTypes.string,
    telephone: PropTypes.string,
}

export default AddressBlock
