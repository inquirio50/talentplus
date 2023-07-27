import React, { Suspense } from 'react';
import { Drawer, useMediaQuery, Theme, LinearProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import SideMenuItems from './SideMenuItems';
import { LEFT_SIDEBAR_THEME_LIGHT } from '../../config/constants';

const styles: any = makeStyles(() => ({
    menu: {
        background: '#0B1B39',
        borderRadius: '0px 50px 50px 0px',
    },
}));

const MainMenu = ({
    mobileOpen,
    onCloseMobile,
    leftSideBarTheme,
}: {
    mobileOpen: boolean;
    onCloseMobile: any;
    leftSideBarTheme: string;
}) => {
    const css = styles();
    const isLight = leftSideBarTheme === LEFT_SIDEBAR_THEME_LIGHT;
    const isLgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'), {
        noSsr: true,
    });
    return (
        <Suspense fallback={<LinearProgress />}>
            <div className="wrapper">
                <Drawer
                    anchor="left"
                    onClose={!isLgUp ? onCloseMobile : undefined}
                    open={!isLgUp ? mobileOpen : true}
                    PaperProps={{
                        className: css.menu,
                        sx: {
                            borderRightColor: 'divider',
                            borderRightStyle: 'solid',
                            borderRightWidth: () => (isLight ? 0 : 1),
                            width: 256,
                        },
                    }}
                    sx={isLgUp ? undefined : { zIndex: (theme) => theme.zIndex.appBar + 100 }}
                    variant={isLgUp ? 'permanent' : 'temporary'}>
                    <SideMenuItems isLight={isLight} isLgUp={isLgUp} />
                </Drawer>
            </div>
        </Suspense>
    );
};

export default MainMenu;
