import colorpalletes from "../styles/colorpalletes.json"

const shapecard = {
    sectionContainer : {
        backgroundColor: colorpalletes["blue"], 
        width: 250,
        height: 250,
        borderRadius: 6,
        margin: 10
    },
    colorContainer : {
        width: 400,
        height: 250,
        backgroundColor: colorpalletes["darkest-blue"],
        borderRadius: 6,
        margin: 10,
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignContent: 'space-between'
    },
    colorSelector : (color: String) => ({
        backgroundColor: color,
        width: 70,
        height: 50,
        margin: 10,
        borderRadius: 8,
        flexBasis: 30
    })
}

const homepage = {
    homeContainer : {
        backgroundColor: colorpalletes["light-blue"],
    },
    shapesBlock : {
        display: 'flex',
        flexDirection : 'row',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    sliderContainer : {
        backgroundColor: colorpalletes['darkest-blue'],
        color: 'white',
        display: 'flex',
    },
    footer : {
        position: 'fixed',
        bottom: 0,
        backgroundColor: colorpalletes['darkest-blue'],
        width: '100%',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignContent: 'space-between'
    },
    footerContent : (rightAlign: boolean) => ({
        padding: 10,
        marginLeft: rightAlign ? 'auto' : 0,
        alignSelf: 'center'
    }),
    footerInfoButton : {
        color: 'white',
        fontSize: 20,
        backgroundColor: colorpalletes['light-blue'],
        padding: 5,
        borderRadius: 5
    }
}

const dialog = {
    technologyList : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    technologyListItem : {
        display: 'flex',
        marginTop: 10,
        marginBottom: 10
    }
}

export { shapecard, homepage, dialog };