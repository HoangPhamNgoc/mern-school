const express = require('express');
const router = express.Router();
const User = require('../models/User');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

// send email
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Cant find user with this email.' });
        }

        // Tạo token đặt lại mật khẩu
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Token hết hạn sau 1 giờ

        await user.save();

        // Gửi email chứa liên kết đặt lại mật khẩu
        const resetUrl = `http://your-app-domain/reset-password/${resetToken}`;
        await sendEmail(
            email,
            'Password Reset: ',
            `Please use this link to reset password: ${resetUrl}`
        );

        res.json({ message: 'Please check your email.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Found error.' });
    }
});

// Đặt lại mật khẩu
router.put('/reset-password/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Token invalid' });
        }

        // Cập nhật mật khẩu mới
        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.json({ message: 'Success' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error' });
    }
});

module.exports = router;