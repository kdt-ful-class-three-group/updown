export const checkedIdName = async ({ field, value, setMessage }) => {
    const load = field === 'id' ? { id: value } : { name: value };

    if (!value || value.trim() === '') {
      setMessage(field === 'id' ? '아이디를 입력해주세요' : '닉네임을 입력해주세요');
      return;
    }
    // 서버에서 id,name 확인. 
    try {
      const res = await fetch('http://localhost:8003/checked', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(load),
      });
      const data = await res.json();
      
      if (field === 'id') {
        if (data.checkId)
          setMessage('사용중인 아이디');
        else
          setMessage('사용가능한 아이디');
      } else {
        if (data.checkName)
          setMessage('사용중인 닉네임');
        else
          setMessage('사용가능한 닉네임');
      }

    } catch (err) {
      console.error('중복확인오류: ', err);
    }
  };
