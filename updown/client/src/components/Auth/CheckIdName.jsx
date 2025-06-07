export const checkedIdName = async ({ field, value, setMessage }) => {
    const load = { [field] : value };

    if (!value || value.trim() === '') {
      setMessage(field === 'id' ? '아이디를 입력해주세요.' : field === 'name' ? '닉네임을 입력해주세요.' : '이메일을 입력해주세요.');
      return;
    }

    if (field === 'id' && value.length < 4) {
      setMessage('아이디는 4자 이상 입력해주세요.');
      return;
    }
    
    if (field === 'name' && value.length < 4) {
      setMessage('이름은 4자 이상 입력이 필요합니다.');
      return;
    }
    
    if (field === 'email' && (!value.includes('@') || value.length < 5)) {
      setMessage('이메일 형식이 올바르지 않거나 너무 짧습니다.');
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
          setMessage('사용중인 아이디입니다.');
        else
          setMessage('사용가능한 아이디입니다.');
      } else if (field === 'name') {
        if (data.checkName)
          setMessage('사용중인 닉네임입니다.');
        else
          setMessage('사용가능한 닉네임입니다.');
      } else if (field === 'email') {
        if (data.checkName)
          setMessage('사용중인 이메일입니다.');
        else
          setMessage('사용가능한 이메일입니다.');
      }

    } catch (err) {
      console.error('중복확인오류: ', err);
    }
  };
