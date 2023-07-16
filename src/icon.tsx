import {
    IconDashboard,
    IconTag,
    IconStorage,
    IconSettings,
    IconHome,
    IconSave,
    IconEdit,
    IconIdcard,
    IconApps,
    IconFile,
    IconArchive,
    IconBook,
    IconBranch,
    IconBug,
    IconBulb,
    IconCalendarClock,
    IconCalendar,
    IconCamera,
    IconCloud,
    IconCommand,
    IconCommon,
    IconCompass,
    IconCopyright,
    IconDesktop,
    IconDice,
    IconDragDotVertical,
    IconDragDot,
    IconDriveFile,
    IconEar,
    IconEmail,
    IconEmpty,
    IconExperiment,
    IconFileAudio,
    IconFileImage,
    IconFilePdf,
    IconFileVideo,
    IconFire,
    IconFolderAdd,
    IconFolderDelete,
    IconFolder,
    IconGift,
    IconImageClose,
    IconImage,
    IconInteraction,
    IconLanguage,
    IconLayout,
    IconLocation,
    IconLock,
    IconLoop,
    IconMan,
    IconMenu,
    IconMindMapping,
    IconMobile,
    IconMoon,
    IconMosaic,
    IconNav,
    IconNotificationClose,
    IconNotification,
    IconPalette,
    IconPen,
    IconPhone,
    IconPrinter,
    IconPublic,
    IconPushpin,
    IconQrcode,
    IconRobotAdd,
    IconRobot,
    IconSafe,
    IconSchedule,
    IconShake,
    IconSkin,
    IconStamp,
    IconSubscribeAdd,
    IconSubscribe,
    IconSubscribed,
    IconSun,
    IconTags,
    IconThunderbolt,
    IconTool,
    IconTrophy,
    IconUnlock,
    IconUserAdd,
    IconUserGroup,
    IconUser,
    IconVideoCamera,
    IconWifi,
    IconWoman,
} from '@arco-design/web-react/icon';
import styles from './style/layout.module.less';

//获取名称
export const getIconFromKey = (key: string) => {
    switch (key) {
        case 'home':
            return <IconHome className={styles.icon} />;
        case 'save':
            return <IconSave className={styles.icon} />;
        case 'system':
            return <IconSettings className={styles.icon} />;
        case 'edit':
            return <IconEdit className={styles.icon} />;
        case 'file':
            return <IconFile className={styles.icon} />;
        case 'apps':
            return <IconApps className={styles.icon} />;
        case 'archive':
            return <IconArchive className={styles.icon} />;
        case 'book':
            return <IconBook className={styles.icon} />;
        case 'branch':
            return <IconBranch className={styles.icon} />;
        case 'bug':
            return <IconBug className={styles.icon} />;
        case 'bulb':
            return <IconBulb className={styles.icon} />;
        case 'calendarClock':
            return <IconCalendarClock className={styles.icon} />;
        case 'calendar':
            return <IconCalendar className={styles.icon} />;
        case 'camera':
            return <IconCamera className={styles.icon} />;
        case 'cloud':
            return <IconCloud className={styles.icon} />;
        case 'command':
            return <IconCommand className={styles.icon} />;
        case 'common':
            return <IconCommon className={styles.icon} />;
        case 'compas':
            return <IconCompass className={styles.icon} />;
        case 'copyright':
            return <IconCopyright className={styles.icon} />;
        case 'dashboard':
            return <IconDashboard className={styles.icon} />;
        case 'desktop':
            return <IconDesktop className={styles.icon} />;
        case 'dice':
            return <IconDice className={styles.icon} />;
        case 'dragDotVertical':
            return <IconDragDotVertical className={styles.icon} />;
        case 'dragDot':
            return <IconDragDot className={styles.icon} />;
        case 'driveFile':
            return <IconDriveFile className={styles.icon} />;
        case 'ear':
            return <IconEar className={styles.icon} />;
        case 'email':
            return <IconEmail className={styles.icon} />;
        case 'empty':
            return <IconEmpty className={styles.icon} />;
        case 'experiment':
            return <IconExperiment className={styles.icon} />;
        case 'fileAudio':
            return <IconFileAudio className={styles.icon} />;
        case 'fileImage':
            return <IconFileImage className={styles.icon} />;
        case 'filePdf':
            return <IconFilePdf className={styles.icon} />;
        case 'fileVideo':
            return <IconFileVideo className={styles.icon} />;
        case 'fire':
            return <IconFire className={styles.icon} />;
        case 'folderAdd':
            return <IconFolderAdd className={styles.icon} />;
        case 'folderDelete':
            return <IconFolderDelete className={styles.icon} />;
        case 'folder':
            return <IconFolder className={styles.icon} />;
        case 'gift':
            return <IconGift className={styles.icon} />;
        case 'idcard':
            return <IconIdcard className={styles.icon} />;
        case 'imageClose':
            return <IconImageClose className={styles.icon} />;
        case 'image':
            return <IconImage className={styles.icon} />;
        case 'interaction':
            return <IconInteraction className={styles.icon} />;
        case 'language':
            return <IconLanguage className={styles.icon} />;
        case 'layout':
            return <IconLayout className={styles.icon} />;
        case 'location':
            return <IconLocation className={styles.icon} />;
        case 'lock':
            return <IconLock className={styles.icon} />;
        case 'loop':
            return <IconLoop className={styles.icon} />;
        case 'man':
            return <IconMan className={styles.icon} />;
        case 'menu':
            return <IconMenu className={styles.icon} />;
        case 'mindMapping':
            return <IconMindMapping className={styles.icon} />;
        case 'mobile':
            return <IconMobile className={styles.icon} />;
        case 'moon':
            return <IconMoon className={styles.icon} />;
        case 'mosaic':
            return <IconMosaic className={styles.icon} />;
        case 'nav':
            return <IconNav className={styles.icon} />;
        case 'notificationClose':
            return <IconNotificationClose className={styles.icon} />;
        case 'notification':
            return <IconNotification className={styles.icon} />;
        case 'palette':
            return <IconPalette className={styles.icon} />;
        case 'pen':
            return <IconPen className={styles.icon} />;
        case 'phone':
            return <IconPhone className={styles.icon} />;
        case 'printer':
            return <IconPrinter className={styles.icon} />;
        case 'public':
            return <IconPublic className={styles.icon} />;
        case 'pushpin':
            return <IconPushpin className={styles.icon} />;
        case 'qrcode':
            return <IconQrcode className={styles.icon} />;
        case 'robotAdd':
            return <IconRobotAdd className={styles.icon} />;
        case 'robot':
            return <IconRobot className={styles.icon} />;
        case 'safe':
            return <IconSafe className={styles.icon} />;
        case 'schedule':
            return <IconSchedule className={styles.icon} />;
        case 'shake':
            return <IconShake className={styles.icon} />;
        case 'skin':
            return <IconSkin className={styles.icon} />;
        case 'stamp':
            return <IconStamp className={styles.icon} />;
        case 'storage':
            return <IconStorage className={styles.icon} />;
        case 'subscribeAdd':
            return <IconSubscribeAdd className={styles.icon} />;
        case 'subscribe':
            return <IconSubscribe className={styles.icon} />;
        case 'subscribed':
            return <IconSubscribed className={styles.icon} />;
        case 'sun':
            return <IconSun className={styles.icon} />;
        case 'tag':
            return <IconTag className={styles.icon} />;
        case 'tags':
            return <IconTags className={styles.icon} />;
        case 'thunderbolt':
            return <IconThunderbolt className={styles.icon} />;
        case 'tool':
            return <IconTool className={styles.icon} />;
        case 'trophy':
            return <IconTrophy className={styles.icon} />;
        case 'unlock':
            return <IconUnlock className={styles.icon} />;
        case 'userAdd':
            return <IconUserAdd className={styles.icon} />;
        case 'userGroup':
            return <IconUserGroup className={styles.icon} />;
        case 'user':
            return <IconUser className={styles.icon} />;
        case 'videoCamera':
            return <IconVideoCamera className={styles.icon} />;
        case 'wifi':
            return <IconWifi className={styles.icon} />;
        case 'woman':
            return <IconWoman className={styles.icon} />;
        default:
            return <div className={styles['icon-empty']} />;

    }
};
