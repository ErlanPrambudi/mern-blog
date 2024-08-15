import Management from "../models/management.model.js"
import { errorHandler } from "../utils/error.js"

export const create = async (req, res, next) => {

    if (!req.user.isAdmin) {
        return next(errorHandler(403, "You are not allowed to create a post"))
    }
    if (!req.body.namaLembaga || !req.body.ketua || !req.body.wakil || !req.body.sekretaris || !req.body.bendahara || !req.body.dpo || !req.body.content) {
        return next(errorHandler(400, "please provide all required fields"))
    }
    const slug = req.body.namaLembaga.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9]/g, '')

    const newManagement = new Management({
        ...req.body, slug, userId: req.user.id,
    })
    try {
        const savedManagement = await newManagement.save()
        res.status(201).json(savedManagement)
    } catch (error) {
        next(error)
    }
}


export const getmanagements = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0
        const limit = parseInt(req.query.limit) || 9
        const sortDirection = req.query.order === "asc" ? 1 : -1
        const managements = await Management.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.namaLembaga && { category: req.query.namaLembaga }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.managementId && { _id: req.query.managementId }),
            ...(req.query.searchTerm && {
                $or: [
                    { namaLembaga: { $regex: req.query.searchTerm, $options: 'i' } },
                    { content: { $regex: req.query.searchTerm, $options: 'i' } },
                ]
            }),
        }).sort({ updateAt: sortDirection }).skip(startIndex).limit(limit)

        const totalManagements = await Management.countDocuments()

        const now = new Date()
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        )
        const lastMonthManagement = await Management.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        })
        res.status(200).json({
            managements,
            totalManagements,
            lastMonthManagement,
        })


    } catch (error) {
        next(error)
    }
}

export const deletemanagement = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(403, "You are not allowed to delete this post"))
    }
    try {
        await Management.findByIdAndDelete(req.params.managementId)
        res.status(200).json("management has been deleted")
    } catch (error) {
        next(error)
    }
}

export const updatemanagement = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(403, "You are not allowed to update this post"))
    }
    try {
        const updatedManagement = await Management.findByIdAndUpdate(
            req.params.managementId, {
            $set: {
                namaLembaga: req.body.namaLembaga,
                ketua: req.body.ketua,
                wakil: req.body.wakil,
                sekretaris: req.body.sekretaris,
                bendahara: req.body.bendahara,
                dpo: req.body.dpo,
                content: req.body.content,
                image: req.body.image,
            }
        }, { new: true }
        )
        res.status(200).json(updatedManagement)
    } catch (error) {
        next(error)
    }
}