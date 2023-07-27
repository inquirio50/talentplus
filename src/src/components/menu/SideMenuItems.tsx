/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Grid, styled, List, ListSubheader } from '@mui/material';
import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Logo from '../../assets/images/menu/menuLogo.png';
import getMenuItems from './menu';
import generateBottomMenu from './bottomMenu';
import {
    ADMIN_DASHBOARD_ROUTE,
    CANDIDATE_DASHBOARD_ROUTE,
    MAIN_ROUTE,
    RECRUITER_DASHBOARD_ROUTE,
} from '../../routes/routes';
import MenuItemRender from './MenuItemRender';
import { RootState } from '../../store/store';
import { ADMIN_ROLE, CONSULTANT_ROLE, PERMANENT_ROLE, EMPLOYER_ROLE, RECRUITER_ROLE } from '../../config/constants';

const styles: any = makeStyles(() => ({
    content: {
        padding: '40px 8px 168px 8px',
    },
    gridLogo: {
        paddingTop: 24,
        paddingLeft: 16,
        paddingBottom: 40,
        position: 'fixed',
        top: 0,
    },
    gridDown: {
        position: 'fixed',
        bottom: 0,
        paddingBottom: '156px',
    },
    gridMenu: {
        width: 240,
        position: 'fixed',
        top: 96,
    },
}));

const ScrollbarRoot = styled(SimpleBar)``;

const SideMenuItems = ({ isLight, isLgUp }: { isLight?: boolean; isLgUp: boolean }) => {
    const css = styles();
    const { user } = useSelector((state: RootState) => ({
        user: state.authentication.user,
    }));
    const menuItems: any[] = getMenuItems();
    const bottomMenuItems: any[] = generateBottomMenu();

    let dashBoardRoute = MAIN_ROUTE;
    if (user.role === ADMIN_ROLE) {
        dashBoardRoute = ADMIN_DASHBOARD_ROUTE;
    } else if (user.role === CONSULTANT_ROLE || user.role === PERMANENT_ROLE) {
        dashBoardRoute = CANDIDATE_DASHBOARD_ROUTE;
    } else if (user.role === EMPLOYER_ROLE || user.role === RECRUITER_ROLE) {
        dashBoardRoute = RECRUITER_DASHBOARD_ROUTE;
    }

    return (
        <Grid container className={css.content}>
            <Grid item xs={12}>
                <ScrollbarRoot
                    sx={{
                        height: 'auto',
                        '& .simplebar-content': {
                            height: 'auto',
                        },
                    }}>
                    <Grid container>
                        <Grid item xs={12} className={css.gridLogo}>
                            <Link to={dashBoardRoute}>
                                <img
                                    src={Logo}
                                    alt="logo"
                                    className={isLgUp ? 'logo-lg' : 'logo-sm'}
                                    width={isLgUp ? 101.37 : 71}
                                />
                            </Link>
                        </Grid>
                        <Grid item xs={12} className={css.gridMenu}>
                            {menuItems.map((item) => (
                                <List
                                    disablePadding
                                    key={item.key}
                                    subheader={
                                        item &&
                                        item.title && (
                                            <ListSubheader
                                                disableGutters
                                                disableSticky
                                                sx={{
                                                    color: 'white',
                                                    fontSize: 16,
                                                    fontWeight: 700,
                                                    lineHeight: 24,
                                                    textTransform: 'uppercase',
                                                }}>
                                                {item.title}
                                            </ListSubheader>
                                        )
                                    }>
                                    <List disablePadding>
                                        <MenuItemRender item={item} path={item.path} />
                                    </List>
                                </List>
                            ))}
                        </Grid>
                        <Grid item xs={12} className={css.gridDown}>
                            {bottomMenuItems.map((item) => (
                                <List
                                    disablePadding
                                    key={item.key}
                                    subheader={
                                        item &&
                                        item.title && (
                                            <ListSubheader
                                                disableGutters
                                                disableSticky
                                                sx={{
                                                    color: 'white',
                                                    fontSize: 16,
                                                    fontWeight: 700,
                                                    lineHeight: 24,
                                                    textTransform: 'uppercase',
                                                }}>
                                                {item.title}
                                            </ListSubheader>
                                        )
                                    }>
                                    <List disablePadding dense>
                                        <MenuItemRender item={item} path={item.path} />
                                    </List>
                                </List>
                            ))}
                        </Grid>
                    </Grid>
                </ScrollbarRoot>
            </Grid>
        </Grid>
    );
};

SideMenuItems.defaultProps = {
    isLight: false,
};

export default SideMenuItems;
