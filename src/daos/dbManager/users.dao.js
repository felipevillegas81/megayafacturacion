import { userModel } from "../../models/user.model.js";

class UserDao {
    async getAll() {
        return await userModel.find()
    }

    async getById(id) {
        return userModel.findOne({ _id: id })
    }

    async getByEmail(email) {
        return userModel.findOne({ email })
    }

    async create(data) {
        return await userModel.create(data)
    }

    async update(id, data) {
        return await userModel.updateOne({ _id: id}, { $set: data})
    }

    async delete(id) {
        return await userModel.deleteOne({ _id: id })       
    }
}

export default new UserDao()