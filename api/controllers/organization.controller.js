import Organization from "../models/organization.model.js"
import { errorHandler } from "../utils/error.js"

export const create = async (req, res, next) => {

    if (!req.user.isAdmin) {
        return next(errorHandler(403, "You are not allowed to create a post"))
    }
    if (!req.body.namaLembaga || !req.body.content) {
        return next(errorHandler(400, "please provide all required fields"))
    }
    const slug = req.body.namaLembaga.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9]/g, '')

    const newOrganization = new Organization({
        ...req.body, slug, userId: req.user.id,
    })
    try {
        const savedOrganization = await newOrganization.save()
        res.status(201).json(savedOrganization)
    } catch (error) {
        next(error)
    }
}


export const getorganizations = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0
        const limit = parseInt(req.query.limit) || 9
        const sortDirection = req.query.order === "asc" ? 1 : -1
        const organizations = await Organization.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.namaLembaga && { category: req.query.namaLembaga }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.organizationId && { _id: req.query.organizationId }),
            ...(req.query.searchTerm && {
                $or: [
                    { namaLembaga: { $regex: req.query.searchTerm, $options: 'i' } },
                    { content: { $regex: req.query.searchTerm, $options: 'i' } },
                ]
            }),
        }).sort({ updateAt: sortDirection }).skip(startIndex).limit(limit)

        const totalOrganizations = await Organization.countDocuments()

        const now = new Date()
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        )
        const lastMonthOrganizations = await Organization.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        })
        res.status(200).json({
            organizations,
            totalOrganizations,
            lastMonthOrganizations,
        })


    } catch (error) {
        next(error)
    }
}

export const deleteorganization = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(403, "You are not allowed to delete this post"))
    }
    try {
        await Organization.findByIdAndDelete(req.params.organizationId)
        res.status(200).json("organization has been deleted")
    } catch (error) {
        next(error)
    }
}

export const updateorganization = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(403, "You are not allowed to update this post"))
    }
    try {
        const updatedOrganization = await Organization.findByIdAndUpdate(
            req.params.organizationId, {
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
        res.status(200).json(updatedOrganization)
    } catch (error) {
        next(error)
    }
}