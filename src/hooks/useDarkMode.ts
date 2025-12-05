import { useEffect, useState } from "react";

export function useDarkMode() {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    });

    useEffect(() => {
        const root = document.documentElement;

        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        };

        localStorage.setItem('theme', theme);
    }, [theme]);

    function toggleTheme() {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return { theme, toggleTheme };
};


// ---

// react hook

// useEffect 在特定時機使用某段程式碼
// 1. 呼叫 API
// 2. 設定 event listener（scroll、resize…）
// 3. 操作 localStorage
// 4. 設定或取消 timer
// 5. DOM 操作

/* 語法

    useEffect(() => {
    // Do something
    }, [dependency]);

dependency: 控制useEffect什麼時候執行


1. 第一次載入

    useEffect(() => {
    // 空陣列 第一次載入
    }, []);


2. 依賴變動 => 執行

    useEffect(() => {
    // theme 改變了 執行...
    }, [theme]);

*/

/* 以切換深淺模式為例子

    useEffect(() => {
        const root = document.documentElement;

        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        };

        localStorage.setItem('theme', theme);
    }, [theme]);

時機: 當theme改變時
做什麼: html標籤toggle dark class & 在localStorage改變theme的value

*/