import { errorHandler } from "../utils/error.js"
import Comment from "../models/comment.model.js"
import User from "../models/user.model.js"; //
import Post from '../models/post.model.js';

export const createComment = async (req, res, next) => {
    try {
        const { content, postId, userId } = req.body

        if (userId !== req.user.id) {
            return next(errorHandler(403, "You are not allowed to create this comment"))
        }
        const newComment = new Comment({
            content,
            postId,
            userId,
        })
        await newComment.save()

        res.status(200).json(newComment)
    } catch (error) {
        next(error)
    }
}
export const getPostComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1, })
        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
}
export const likeComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId)
        if (!comment) {
            return next(errorHandler(404, "Command not found"))
        }
        const userIndex = comment.likes.indexOf(req.user.id)
        if (userIndex === -1) {
            comment.numberOfLikes += 1
            comment.likes.push(req.user.id)
        } else {
            comment.numberOfLikes -= 1
            comment.likes.splice(userIndex, 1)
        }
        await comment.save()
        res.status(200).json(comment)
    } catch (error) {
        next(error)
    }
}


export const editComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId)
        if (!comment) {
            return next(errorHandler(404, "Command not found"))
        }
        if (comment.userId !== req.user.id && !req.user.isAdmin) {
            return next(errorHandler(403, "You are not allowed to edit this comment"))
        }
        const editedComment = await Comment.findByIdAndUpdate(req.params.commentId, {
            content: req.body.content,
        }, { new: true })

        res.status(200).json(editedComment)
    } catch (error) {
        next(error)
    }
}
export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId)
        if (!comment) {
            return next(errorHandler(404, "Command not found"))
        }
        if (comment.userId !== req.user.id && !req.user.isAdmin && !req.user.role == "pengurus" && req.user.lembagaId === comment.lembagaId) {
            return next(errorHandler(403, "You are not allowed to edit this comment"))
        }
        await Comment.findByIdAndDelete(req.params.commentId)

        res.status(200).json("comment has been deleted")
    } catch (error) {
        next(error)
    }
}
export const getcomments = async (req, res, next) => {
    if (req.user.role === 'user') return next(errorHandler(403, "You are not allowed to get all comments"));
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'desc' ? -1 : 1;

        const comments = await Comment.find({})
            .populate("userId", "username")  // Populasi username dari model User
            .sort({ createdAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const totalComments = await Comment.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        const lastMonthComments = await Comment.countDocuments({ createdAt: { $gte: oneMonthAgo } });

        res.status(200).json({ comments, totalComments, lastMonthComments });
    } catch (error) {
        next(error);
    }
}

export const getCommentsByUser = async (req, res) => {
    try {
        const { userId, startIndex = 0 } = req.query;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Cari semua postingan yang dibuat oleh pengguna dengan userId
        const posts = await Post.find({ userId })
            .select('_id') // Hanya ambil ID untuk digunakan dalam query berikutnya
            .exec();

        // Ambil semua komentar yang terkait dengan postingan tersebut
        const comments = await Comment.find({ postId: { $in: posts.map(post => post._id) } })
            .skip(parseInt(startIndex))
            .limit(9) // Mengatur jumlah komentar yang diambil
            .populate('postId', 'title')
            .populate('userId', 'username') // Populate username dari model User
            .exec();

        return res.status(200).json({ comments });
    } catch (error) {
        console.error('Error fetching comments:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};