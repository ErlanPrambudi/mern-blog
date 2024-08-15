import mongoose from "mongoose";

const managementSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        namaLembaga: {
            type: String,
            required: true,
            unique: true,
        },
        ketua: {
            type: String,
            required: true,
            unique: false,
        },
        wakil: {
            type: String,
            required: true,
            unique: false,
        },
        sekretaris: {
            type: String,
            required: true,
            unique: false,
        },
        bendahara: {
            type: String,
            required: true,
            unique: false,
        },
        dpo: {
            type: String,
            required: true,
            unique: false,
        },
        image: {
            type: String,
            required: true,
            default: "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png",
        },
        content: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: false,
            unique: true,
        },
    }, { timestamps: true }
);

const Management = mongoose.model('management', managementSchema);
export default Management;