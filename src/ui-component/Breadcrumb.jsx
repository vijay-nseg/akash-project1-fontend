import { Breadcrumbs, Hidden, styled, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import MainCard from './cards/MainCard';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const BreadcrumbRoot = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between'
}));

const BreadcrumbName = styled('h4')(() => ({
  margin: 0,
  fontSize: '16px',
  color: 'primary',
  paddingBottom: '1px',
  verticalAlign: 'middle',
  textTransform: 'capitalize',
}));

const SubName = styled('span')(({ theme }) => ({
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
}));

const Separator = styled('h4')(({ theme }) => ({
  margin: 0,
  marginLeft: 8,
  paddingBottom: '3px',
  color: theme.palette.text.hint,
}));

const Breadcrumb = ({ routeSegments }) => {
  const theme = useTheme();
  const hint = theme.palette.text.hint;

  return (
    <MainCard sx={{
      marginBottom:'25px'
    }}>
      <BreadcrumbRoot>
        {routeSegments ? (
          <Hidden xsDown>
            <BreadcrumbName>{routeSegments[routeSegments.length - 1]['name']}</BreadcrumbName>
            <Separator>|</Separator>
          </Hidden>
        ) : null}

        <Breadcrumbs
          // separator={<Icon sx={{ color: hint }}>navigate_next</Icon>}
          separator={<NavigateNextIcon  color='hint'></NavigateNextIcon>}
          sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}
        >
          <NavLink to="/">
            <HomeIcon color="primary"></HomeIcon>
            {/* <StyledIcon color="primary">home</StyledIcon> */}
          </NavLink>

          {routeSegments
            ? routeSegments.map((route, index) => {
              return index !== routeSegments.length - 1 ? (
                <NavLink key={index} to={route.path}>
                  <SubName>{route.name}</SubName>
                </NavLink>
              ) : (
                <SubName key={index}>{route.name}</SubName>
              );
            })
            : null}
        </Breadcrumbs>
      </BreadcrumbRoot>
    </MainCard>
  );
};

export default Breadcrumb;
