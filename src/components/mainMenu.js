import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { createLocalLink } from '../utils'
import '../style/style.css'

const MAIN_MENU_QUERY = graphql`
    fragment MenuFields on WPGQL_MenuItem {
        id
        label
        url
    }

    query GET_MENU_ITEMS {
        wpgql {
            menuItems(where: {location: PRIMARY}) {
                nodes {
                    ...MenuFields
                    childItems {
                        nodes {
                            ...MenuFields
                        }
                    }
                }
            }
        }
    }
`

const renderMenuItem = item => {
    let hasChild = false
    if(item.childItems && item.childItems.nodes.length) {
        hasChild = true
    }
    return (
        <li key={item.id}>
            <Link to={createLocalLink(item.url)}>{item.label}</Link>
            {hasChild && renderChildMenu(item)}
        </li>
    )
}

const renderChildMenu = item => {
    return (
        <ul>
            {item.childItems.nodes.map(child => renderMenuItem(child))}
        </ul>
    )
}

const MainMenu = props => {
    return (
        <StaticQuery
        query={MAIN_MENU_QUERY}
        render={({
            wpgql: {
                menuItems: { nodes: menu }
            }
        }) => {
            console.log(menu)
            return (
                <nav className="main-menu">
                    <ul>
                        {menu.map(item => renderMenuItem(item))}
                    </ul>
                </nav>
            )
        }}
        />
    )
}

export default MainMenu