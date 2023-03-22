import { Schema, model } from 'mongoose';

const megayausersCollection = 'megayausers'

const megayauserSchema = new Schema({
    identification: { type: Number, index: true, required: true, unique: true},
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },

    // address: { type: String, required: true },
    // country: { type: String, required: true },
    // deparment: { type: String, required: true},
    // city: { type: String, required: true},

    // cell_phone: { type: Number, required:true },
    // phone: { type: Number, required:true },

    email: { type: String, index: true, required: true, unique: true },
    password: { type: String, required: true },

    role: { type: String, required: true, default: 'user', enum: ['user', 'admin'] },

})

export const megayauserModel = model(megayausersCollection, megayauserSchema)