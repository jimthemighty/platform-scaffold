import React from 'react'

import Sheet from '../../components/sheet'
import Nav from '../../components/nav'
import NavigationSocialIcons from './partials/navigation-social-icons'


const root = {title:"Store", path:"/", children:[
    {title:"Men's Clothing", path:"/mens-clothing/", children:[
        {title:"Casual Shirts", path:"/mens-clothing/casual-shirts/"},
        {title:"Coats and Jackets", path:"/mens-clothing/coats-and-jackets/"},
        {title:"Jeans", path:"/mens-clothing/jeans/"},
        {title:"Polos", path:"/mens-clothing/polos/"},
        {title:"Shorts", path:"/mens-clothing/shorts/"},
    ]},
    {title:"Footwear", path:"/footwear/"},
    {title:"Accessories", path:"/accessories/"},
    {title:"For the Home", path:"/for-the-home/"},
    {title:"My Account", path:"/my-account/", type: "custom"},
    {title:"Wish List", path:"/wish-list/", type: "custom"},
    {title:"Gift Registry", path:"/gift-registry/", type: "custom"},
]};


const Navigation = (props) => {
    const {id} = props
    return (
        <Sheet id={id} className="t-navigation">
            <Nav root={root} path="/"/>

            <NavigationSocialIcons />

            <div className="t-navigation__copyright u-padding-md">
                <p>© 2017 Mobify Research & Development Inc. All rights reserved.</p>
            </div>

            <div dangerouslySetInnerHTML={{__html: `<button on="tap:${id}.toggle">Toggle Nav</button>`}} />
        </Sheet>
    )
}

export default Navigation
