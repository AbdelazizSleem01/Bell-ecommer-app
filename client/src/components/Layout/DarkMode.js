import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import cookies from 'js-cookie';
import '../../styles/HomePage.css'
import { Link } from 'react-router-dom';

const DarkMode = () => {
    const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme')) || false);
    const [visible, setVisible] = useState(false)

    const languages = [
        {
            code: 'en',
            name: 'English',
            country_code: 'gb',
            imgSrc: "/images/usa.png"
        },
        {
            code: 'ar',
            name: 'العربية',
            country_code: 'sa',
            dir: 'rtl',
            imgSrc: "/images/flag.png"

        },
    ];

    const currentLanguageCode = cookies.get('i18next') || 'en';
    const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
    const { t } = useTranslation();

    useEffect(() => {
        console.log('Setting page stuff');
        languages.forEach((lang) => {
            document.body.classList.remove(`lang-${lang.code}`);
        });
        document.body.dir = currentLanguage.dir || 'ltr';
        document.body.classList.add(`lang-${currentLanguage.code}`);
    }, [currentLanguage, t]);


    const handleClick = () => {
        setTheme(!theme);
    };

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(theme));
        if (theme === false) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [theme]);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 70) {
                document.body.classList.add('IMG');
            } else {
                document.body.classList.remove('IMG');
            }
        });
    }, []);

    const handleUp = () => {
        setVisible(false);
        window.scrollTo(0, 0);
    }
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 350) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        });
    }, [])


    return (
        <>
            <div className="dropdown language">
                {languages?.map(({ code, name, country_code, imgSrc }) => {
                    if (currentLanguageCode === code) {
                        return null;
                    } else {
                        return (
                            <span key={country_code}>
                                <Link
                                    className="dropdown-item"
                                    onClick={() => {
                                        i18next.changeLanguage(code);
                                    }}
                                >
                                    
                                    <img src={imgSrc} alt={name} className='ms-1' />
                                </Link>
                            </span>
                        );
                    };
                })};
            </div>
            <div>
                {
                    visible ? (
                        <button className='up-button' onClick={handleUp}>
                            <img src='/images/up-chevron.png' alt='up-img' />
                        </button>
                    ) : (
                        ""
                    )
                }
            </div>
            <div className='dark-mode'>
                <button className="Darkmode" onClick={handleClick}>
                    {theme ?
                        (
                            <img src='/images/day-mode.png' alt='day-mode-img' />
                        ) : (
                            <img src='/images/dark-mode.png' alt='dark-mode-img' />
                        )
                    }
                </button>
            </div>
        </>
    )
}

export default DarkMode