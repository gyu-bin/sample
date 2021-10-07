import React, { useEffect, useRef } from 'react'

/**useRef란? 특정 DOM을 가릴킬때 사용하는 Hook
ref:JS의 getElementByID()처럼, component의 어떤 부분을 선택할수 있게 해준다.
리액트에 있는 모든 component는 reference element를 가지고있어서,
 어떤 Component에 ref={변수명} 을 넣어주면, 해당 component를 참조하게됨.

useEffect란? 리액트 컴포넌트가 렌더링될 때마다 특정 작업을 실행할수 있도록 하는 Hook
 component가 mount,unmount,update 될때.
 즉, 생명주기메서드를 쓰는것.
 **/

function DangerouslySetHtmlContent(props) {
    const { html, ...rest } = props //기존 rest의 값을 복사함. spread연산자.
    const divRef = useRef(null)

    useEffect(() => {
        if (!html) return

        const slotHtml = document.createRange().createContextualFragment(html)
        // Create a 'tiny' document and parse the html string
        divRef.current.innerHTML = '' // Clear the container
        divRef.current.appendChild(slotHtml) // Append the new content
    }, [html])


    return (
        <div {...rest} ref={divRef}/>
    )
}

export default DangerouslySetHtmlContent
