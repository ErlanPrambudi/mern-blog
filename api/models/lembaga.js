import mongoose from "mongoose";

const lembagaSchema = new mongoose.Schema(
    {
        idLembaga: {
            type: String,
            required: true,
        },
        namaLembaga: {
            type: String,
            required: true,
        },
        deskripsi: {
            type: String,
            required: false,
        },
        logo: {
            type: String,
            default: "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png",
        },
        visi: {
            type: String,
            required: false,
        },
        misi: {
            type: String,
            required: false,
        },
        idPengurus: {
            type: String,
            required: false,
        },
        slug: {
            type: String,
            required: false,
            unique: true,
        },
    }, { timestamps: true }
);

const Lembaga = mongoose.model('Lembaga', lembagaSchema);
export default Lembaga;