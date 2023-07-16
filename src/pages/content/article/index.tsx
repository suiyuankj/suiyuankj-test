import React, { useEffect, useMemo, useRef, useState } from 'react';
import cs from 'classnames';
import styles from './style/layout.module.less';
import { Layout, Spin, Message } from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import { useSelector } from 'react-redux';
import { GlobalState } from '@/store';
import getUrlParams from '@/utils/getUrlParams';

import Footer from '@arco-design/web-react/es/Layout/footer';
import Content from '@arco-design/web-react/es/Layout/content';

import NavbarPage from '@/components/NavBarPage';
import Editor from './editor';
import { IconDesktop, IconMobile, IconToRight } from '@arco-design/web-react/icon';

function ArticlePage() {
    const urlParams = getUrlParams();


    //多语言加载
    const locale = useLocale();
    const { settings, userLoading, userInfo } = useSelector(
        (state: GlobalState) => state
    );

    //配置参数
    const navbarHeight = 60;
    const showNavbar = settings.navbar && urlParams.navbar !== false;
    const showFooter = settings.footer && urlParams.footer !== true;


    const paddingTop = showNavbar ? { paddingTop: navbarHeight } : {};
    const paddingStyle = { ...paddingTop };


    //获取文章内容
    const editorRef = useRef(null);


    useEffect(() => {
        document.body.setAttribute('arco-theme', 'light');
    }, []);

    const handlePublish = () => {
        const editorData = editorRef.current.getArticleData(); // 调用编辑器组件的方法获取数据
        console.log('发布内容:', editorData);
        // 执行发布操作...
      };

    return (
        <Layout className={styles.layout}>
            <div
                className={cs(styles['layout-navbar'], {
                    [styles['layout-navbar-hidden']]: !showNavbar,
                })}
            >
                <NavbarPage title={"添加文章内容"} />
            </div>
            {userLoading ? (
                <Spin className={styles['spin']} />
            ) : (
                <Layout className={styles['layout-content']} style={paddingStyle}>
                    <div className={styles['layout-content-wrapper']}>
                        <Content>
                            <Editor editorBlur={e=>{
                                console.log("editorBlur",e)
                            }}></Editor>
                        </Content>
                    </div>
                    {showFooter && <Footer />}
                </Layout>
            )}
            <div style={{ height: "80px", backgroundColor: "#f2f3f5" }}></div>
            <div className={styles.bottom}>
                <div className={styles.bottomRow}>
                            <div className={styles.item}>
                                <div></div>
                                <div>回到顶部</div>
                            </div>
                            <div className={styles.item} onClick={()=>{
                                console.log("获取参数")
                            }}>
                                <div><IconToRight  style={{ fontSize: '28px',color:"#666" }}/></div>
                                <div style={{fontSize:"9px"}}>发布</div>
                                </div>
                            <div className={styles.item}>
                            <div><IconDesktop  style={{ fontSize: '28px',color:"#666" }}/></div>
                                <div style={{fontSize:"9px"}}>电脑版预览</div>
                            </div>
                            <div className={styles.item}>
                                <div><IconMobile  style={{ fontSize: '28px',color:"#666" }} /></div>
                                <div style={{fontSize:"9px"}}>手机版预览</div>
                            </div>
                </div>
            </div>
        </Layout>
    );
}


export default ArticlePage;
