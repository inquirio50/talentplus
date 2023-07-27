import React from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { makeStyles, withStyles } from '@mui/styles';
import { emphasize, Theme } from '@mui/system';
import { Breadcrumbs, Chip, Grid, Link } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { MAIN_ROUTE } from '../../routes/routes';

type BreadcrumbItems = {
    label: string;
    path: string;
    active?: boolean;
};

type PageTitleProps = {
    breadCrumbItems: Array<BreadcrumbItems>;
    title: string;
    icon: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
};

const useStyles = makeStyles(() => ({
    breadcrumbs: {
        padding: 16,
    },
    activeBreadcrumbs: {
        fontWeight: 'bold',
        textDecoration: 'underline',
    },
}));

const StyledBreadcrumb = withStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.grey[100],
        height: theme.spacing(3),
        color: theme.palette.grey[800],
        fontWeight: 12,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.grey[300],
        },
        '&:active': {
            boxShadow: 1,
            backgroundColor: emphasize(theme.palette.grey[300], 0.12),
        },
    },
}))(Chip) as typeof Chip;

/**
 * @deprecated
 * @param param0
 * @returns
 */
const PageTitle = ({ breadCrumbItems, title, icon }: PageTitleProps) => {
    const { t } = useTranslation();
    const classes = useStyles();
    return (
        <Grid container>
            <Grid item xs={12}>
                <div className="page-title-box">
                    <div className="page-title-right">
                        <Breadcrumbs className={clsx('m-0', classes.breadcrumbs)} maxItems={2} aria-label="breadcrumb">
                            <StyledBreadcrumb
                                component="a"
                                href={MAIN_ROUTE}
                                label={t('home')}
                                icon={<HomeOutlinedIcon fontSize="small" />}
                            />
                            {breadCrumbItems.map((item, index) => {
                                const newIndex = `paths_${index}`;
                                return item.active ? (
                                    <StyledBreadcrumb
                                        key={newIndex}
                                        label={item.label}
                                        icon={icon}
                                        className={classes.activeBreadcrumbs}
                                    />
                                ) : (
                                    <Link color="inherit" href={item.path} key={newIndex}>
                                        <StyledBreadcrumb component="a" href={MAIN_ROUTE} label={item.label} />
                                    </Link>
                                );
                            })}
                        </Breadcrumbs>
                    </div>
                    <h4 className="page-title">{title}</h4>
                </div>
            </Grid>
        </Grid>
    );
};

export default PageTitle;
