import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
	req.session.destroy(() => {
		res.clearCookie('connect.sid');
		res.json({ message: '로그아웃 완료'});
	});
});


export { router };