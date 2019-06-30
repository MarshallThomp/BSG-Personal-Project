module.exports = {
    getAllDogs: async (req, res) => {
        try {
            const db = req.app.get('db')
            let dogs = await db.dogs.get_all_dogs()
            res.status(200).send(dogs)
        } catch (error) {
            console.log('there was an error', error)
            res.status(500).send(error)
        }
    },

    getDog: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { id } = req.params

            let dog = await db.dogs.get_dog(id)
            dog = dog[0]

            res.status(200).send(dog)
        } catch (error) {
            console.log('there was an error', error)
            res.status(500).send(error)
        }
    },

    createDog: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { name, breed, image, age, vaccinated, fixed, description } = req.body
            const { id: user_id } = req.session.user
            console.log(user_id)
            let dogs = await db.dogs.create_dog({
                user_id,
                name,
                breed,
                image,
                age,
                vaccinated,
                fixed,
                description
            })
            console.log(dogs)

            res.status(200).send(dogs)
        } catch (error) {
            console.log('there was an error', error)
            res.status(500).send(error)
        }
    },

    deleteDog: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { id } = req.params
            
            let dogs = await db.dogs.delete_dog(id)

            res.status(200).send(dogs)
        } catch (error) {
            console.log('there was an error', error)
            res.status(500).send(error)
        }
    },

    updateDog: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { id, name, breed, image, age, vaccinated, fixed, description } = req.body

            let dogs = await db.dogs.update_dog({
                id,
                name,
                breed,
                image,
                age,
                vaccinated,
                fixed,
                description
            })

            res.status(200).send(dogs)
        } catch (error) {
            console.log('there was an error', error)
            res.status(500).send(error)
        }
    }
}