import { router } from "./users";

router.post('/logout', (req, res) => {
	req.session.destroy(() => {
		res.send('로그아웃 완료');
	});
});


export { router };