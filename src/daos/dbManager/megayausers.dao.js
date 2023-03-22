import { megayauserModel } from "../../models/megayauser.model.js";

class MegayaUserDao {
    async getAll() {
        return await megayauserModel.find()
    }

    async getById(id) {
        return megayauserModel.findOne({ _id: id })
    }

    // Megaya Find By Identity
    async getByIdentification(identification) {
        return megayauserModel.findOne({ identification })
    }

    async getByEmail(email) {
        return megayauserModel.findOne({ email })
    }

    async create(data) {
        return await megayauserModel.create(data)
    }

    async update(id, data) {
        return await megayauserModel.updateOne({ _id: id}, { $set: data})
    }

    async delete(id) {
        return await megayauserModel.deleteOne({ _id: id })       
    }
}

export default new MegayaUserDao()