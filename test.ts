const getUserData = async () => {
  const url = 'https://prod-api.faw.cn/JT/BA/BA-0222/USR/DEFAULT/getUserForIframe'

  const params = {
    token:
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmYW5nbWluZ2RvbmciLCJjcmVhdGVkIjoxNzQxMzE4NDQ0MTU0LCJpZG1pZCI6InUyMDIyMDAzNzgxIiwiZXhwIjoxNzQxOTIzMjQ0LCJ1cGtpZCI6IjE1OTE0NTAxMDgyNTI2NjM4MTAifQ.AyQBfItYT1V96W1SsCp558TcO8JmeDNZGC8TYyAnAaJMBSje-UegCIn8DF7wbnpn3saskE2APWYqKnuIDRKenQ',
    // tenantId: 'YQJT',
    // source: 'zerotrust',
    // lang: 'zh-cn',
    // systemId: 'IOV-0005',
    // appCode: 'IOV-0005_APP_039',
    // wbEnv: 'prod',
    // microEnv: '1',
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

// 方法 1：使用 async/await
async function init() {
  try {
    const result = await getUserData()
    console.log('用户数据:', result)
  } catch (error) {
    console.error('获取用户数据失败:', error)
  }
}

init()
