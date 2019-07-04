module.exports = {
    getAllMarkers: async (req, res) => {
        try {
            const db = req.app.get('db')
            let markers = await db.markers.get_all_markers()
            res.status(200).send(markers)
        } catch (error) {
            console.log('there was an error', error)
            res.status(500).send(error)
        }
    },

    getMarker: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { id } = req.params

            let marker = await db.markers.get_marker(id)
            console.log(marker)
            marker = marker[0]

            res.status(200).send(marker)
        } catch (error) {
            console.log('there was an error', error)
            res.status(500).send(error)
        }
    },

    createMarker: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { name, lat, lng } = req.body
            console.log(name)
            let markers = await db.markers.create_marker({
                name,
                lat,
                lng
            })
            console.log(markers)
            res.status(200).send(markers)
        } catch (error) {
            console.log('there was an error', error)
            res.status(500).send(error)
        }
    },

    deleteMarker: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { id } = req.params
            console.log(id)

            let markers = await db.markers.delete_marker(id)
            res.status(200).send(markers)
        } catch (error) {
            console.log('there was an error', error)
            res.status(500).send(error)
        }
    }
}