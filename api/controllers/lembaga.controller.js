import Lembaga from "../models/lembaga.js";

// Middleware untuk menangani error
const errorHandler = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
};

export const createLembaga = async (req, res, next) => {
    const { idLembaga, logo, namaLembaga, deskripsi, visi, misi, idPengurus } = req.body;
    if (!idLembaga || !namaLembaga) {
        return next(errorHandler(400, "All fields are required"));
    }

    const newLembaga = new Lembaga({
        idLembaga, logo, namaLembaga, deskripsi, visi, misi, idPengurus
    });

    try {
        await newLembaga.save();
        res.json("Create lembaga successful");
    } catch (error) {
        next(error);
    }
};

export const getLembaga = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'desc' ? -1 : 1;
        const lembaga = await Lembaga.find()
            .sort({ createdAt: sortDirection })
            .limit(limit);
        res.status(200).json({ lembaga });
    } catch (error) {
        next(error);
    }
};

export const updateLembaga = async (req, res, next) => {
    const { id } = req.params;
    const { idLembaga, logo, namaLembaga, deskripsi, visi, misi, idPengurus } = req.body;

    try {
        const lembaga = await Lembaga.findById(id);
        if (!lembaga) {
            return next(errorHandler(404, "Lembaga not found"));
        }

        lembaga.idLembaga = idLembaga || lembaga.idLembaga;
        lembaga.logo = logo || lembaga.logo;
        lembaga.namaLembaga = namaLembaga || lembaga.namaLembaga;
        lembaga.deskripsi = deskripsi || lembaga.deskripsi;
        lembaga.visi = visi || lembaga.visi;
        lembaga.misi = misi || lembaga.misi;
        lembaga.idPengurus = idPengurus || lembaga.idPengurus;
        lembaga.slug

        await lembaga.save();
        res.status(200).json("Update lembaga successful");
    } catch (error) {
        next(error);
    }
};