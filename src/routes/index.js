import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import * as FeatherIcon from 'react-feather';

//import { isUserAuthenticated, getLoggedInUser } from '../helpers/authUtils';

// auth
//const Login = React.lazy(() => import('../pages/auth/Login'));
//const Logout = React.lazy(() => import('../pages/auth/Logout'));
//const Register = React.lazy(() => import('../pages/auth/Register'));
//const ForgetPassword = React.lazy(() => import('../pages/auth/ForgetPassword'));
//const Confirm = React.lazy(() => import('../pages/auth/Confirm'));
// dashboard
//const DashboardOld = React.lazy(() => import('../pages/dashboardOld'));
//DashboardNew
const Dashboard =React.lazy(()=> import('../pages/dashboard/Dashboard'))
//Sucursales
const Sucursales = React.lazy(()=> import('../pages/sucursales/Sucursales'));
//Puestos
const Puestos = React.lazy(()=> import('../pages/puestos/Puestos'));
//Departamentos
const Departamentos = React.lazy(()=> import ('../pages/departamentos/Departamentos'));
//Empleados
const Empleados = React.lazy(()=> import('../pages/empleados/Empleados'));
//Centros de tarbajo
const CentrosTrabajo = React.lazy(()=> import('../pages/centrosTrabajo/CentrosTrabajo'));
// Survey
//const SurveyComponent = React.lazy(()=> import ('../pages/empleados/Survey'));
//Severo
const SeveroComponent = React.lazy(()=> import('../pages/surveys/Severo'));
//Friesgo
const FriesgoComponent = React.lazy(()=>import('../pages/surveys/Friesgo'));
//Orgainzacion
const OrgainzacionComponent = React.lazy(()=> import('../pages/surveys/Orgainzacion'));
//Encuestos
const Encuestos = React.lazy(()=> import('../pages/encuestos/Encuestos'));
//ProgramacionDeEventos
const ProgramacionDeEventos = React.lazy(()=>import('../pages/programaciondeeventos/ProgramacionDeEventos'));

const ReporteGlobal = React.lazy( () => import( '../pages/reportes/ReporteGlobal' ) );

const ReporteGlobalPDF = React.lazy( () => import( '../pages/reportes/ReporteGlobalPDF' ) );

const ReporteIndividual = React.lazy( () => import( '../pages/reportes/ReporteIndividual' ) );

const ReporteIndividualPDF = React.lazy( () => import( '../pages/reportes/ReporteIndividualPDF' ) );


//ErrorAuth
const ErrorAuth = React.lazy( () => import( '../pages/auth/ErrorAuth' ) );
// apps
/*const CalendarApp = React.lazy(() => import('../pages/apps/Calendar'));
const EmailInbox = React.lazy(() => import('../pages/apps/Email/Inbox'));
const EmailDetail = React.lazy(() => import('../pages/apps/Email/Detail'));
const EmailCompose = React.lazy(() => import('../pages/apps/Email/Compose'));
const ProjectList = React.lazy(() => import('../pages/apps/Project/List'));
const ProjectDetail = React.lazy(() => import('../pages/apps/Project/Detail/'));
const TaskList = React.lazy(() => import('../pages/apps/Tasks/List'));
const TaskBoard = React.lazy(() => import('../pages/apps/Tasks/Board'));

// pages
const Starter = React.lazy(() => import('../pages/other/Starter'));
const Profile = React.lazy(() => import('../pages/other/Profile/'));
const Activity = React.lazy(() => import('../pages/other/Activity'));
const Invoice = React.lazy(() => import('../pages/other/Invoice'));
const Pricing = React.lazy(() => import('../pages/other/Pricing'));
const Error404 = React.lazy(() => import('../pages/other/Error404'));
const Error500 = React.lazy(() => import('../pages/other/Error500'));*/

// ui
const BSComponents = React.lazy(() => import('../pages/uikit/BSComponents/'));
const FeatherIcons = React.lazy(() => import('../pages/uikit/Icons/Feather'));
const UniconsIcons = React.lazy(() => import('../pages/uikit/Icons/Unicons'));
const Widgets = React.lazy(() => import('../pages/uikit/Widgets/'));

// charts
const Charts = React.lazy(() => import('../pages/charts/'));

// forms
const BasicForms = React.lazy(() => import('../pages/forms/Basic'));
const FormAdvanced = React.lazy(() => import('../pages/forms/Advanced'));
const FormValidation = React.lazy(() => import('../pages/forms/Validation'));
const FormWizard = React.lazy(() => import('../pages/forms/Wizard'));
const FileUpload = React.lazy(() => import('../pages/forms/FileUpload'));
const Editor = React.lazy(() => import('../pages/forms/Editor'));

// tables
const BasicTables = React.lazy(() => import('../pages/tables/Basic'));
const AdvancedTables = React.lazy(() => import('../pages/tables/Advanced'));


// handle auth and authorization
const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            

            // authorised so return component
            return <Component {...props} />;
        }}
    />
);

// root routes
const rootRoute = {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard" />,
    route: PrivateRoute,
};

// dashboards
//const dashboardoldRoutes = {
  //  path: '/dashboardOld',
   // name: 'DashboardOld',
    //icon: FeatherIcon.Home,
    //header: 'Navigation',
    //badge: {
      //  variant: 'success',
      //  text: '1',
    //},
    //component: DashboardOld,
    //roles: ['Admin'],
    //route: PrivateRoute
//};
//dashboard
const dashboardRoutes = {
    path: '/dashboard',
    name: 'Dashboard',
    icon: FeatherIcon.Home,
    component: Dashboard,
    roles: ['Admin'],
    route: PrivateRoute
};
//Sucursales
const sucursalesRoutes = {
    path: '/sucursales',
    name: 'Sucursales',
    icon: FeatherIcon.MapPin,
    component: Sucursales,
    roles: ['Admin'],
    route: PrivateRoute
};
//Puestos
const puestosRoutes = {
    path: '/puestos',
    name: 'Puestos',
    icon: FeatherIcon.UserCheck,
    component: Puestos,
    roles: ['Admin'],
    route: PrivateRoute
};
//Departamentos
const DepartamentosRoutes = {
    path: '/departamentos',
    name: 'Departamentos',
    icon: FeatherIcon.Share2,
    component: Departamentos,
    roles: ['Admin'],
    route: PrivateRoute
};
//Empleados
const EmpleadosRoutes = {
    path: '/empleados',
    name: 'Empleados',
    icon: FeatherIcon.Users,
    component: Empleados,
    roles: ['Admin'],
    route: PrivateRoute
};

//Centros de trabajo
const CentrosTrabajoRoutes = {
    path: '/centrostrabajo',
    name: 'Centros de trabajo',
    icon: FeatherIcon.Grid,
    component: CentrosTrabajo,
    roles: ['Admin'],
    route: PrivateRoute
};

//Centros de trabajo
const ReporteGlobalRoutes = {
    path: '/reporteglobal',
    name: 'Resultado global',
    icon: FeatherIcon.FileText,
    component: ReporteGlobal,
    roles: ['Admin'],
    route: PrivateRoute
};

const ReporteGlobalPDFRoutes = {
    path: '/reporteglobalpdf',
    component: ReporteGlobalPDF,
    route: Route,
}

const ReporteIndividualRoutes = {
    path: '/reporteindividual',
    name: 'Resultado por empleado',
    icon: FeatherIcon.File,
    component: ReporteIndividual,
    roles: ['Admin'],
    route: PrivateRoute
};

const ReporteIndividualPDFRoutes = {
    path: '/reporteglobalpdf',
    component: ReporteIndividualPDF,
    route: Route,
}

//Encuestos
const EncuestosRoutes = {
    path: '/encuestos',
    name: 'Encuestos',
    icon: FeatherIcon.Twitch,
    component: Encuestos,
    roles: ['Admin'],
    route: PrivateRoute
};

//Programacion de eventos
const ProgramacionDeEventosRoutes = {
    path: '/programaciondeeventos',
    name: 'Programacion De Eventos',
    icon: FeatherIcon.Calendar,
    component: ProgramacionDeEventos,
    roles: ['Admin'],
    route: PrivateRoute
};
//Reportes
const ReportesRoutes = {
    path: '/centrosdetarbajo',
    name: 'Reportes',
    icon: FeatherIcon.Trello,
    component: CentrosTrabajo,
    roles: ['Admin'],
    route: PrivateRoute
};
const authRoutes = {
    path: '/account',
    name: 'Auth',
    children: [
        {
            path: '/severo/:id',
            component: SeveroComponent,
            route: Route,
        },
        {
            path: '/friesgo/:id',
            component: FriesgoComponent,
            route: Route,
        },
        {
            path: '/orgainzacion/:id',
            component: OrgainzacionComponent,
            route: Route,
        }
    ],
};

//OrgainzacionComponent
const OrgainzacionRoutes = {
    path: '/organizacion/:id',
    component: OrgainzacionComponent,
    route: Route,
}
// apps Trello

const ErrorRoutes = {
    path: '/errorauth',
    component: ErrorAuth,
    route: Route
}

/*const calendarAppRoutes = {
    path: '/apps/calendar',
    name: 'Calendar',
    header: 'Apps',
    icon: FeatherIcon.Calendar,
    component: CalendarApp,
    route: PrivateRoute,
    roles: ['Admin'],
};

const emailAppRoutes = {
    path: '/apps/email',
    name: 'Email',
    icon: FeatherIcon.Inbox,
    children: [
        {
            path: '/apps/email/inbox',
            name: 'Inbox',
            component: EmailInbox,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/apps/email/details',
            name: 'Details',
            component: EmailDetail,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/apps/email/compose',
            name: 'Compose',
            component: EmailCompose,
            route: PrivateRoute,
            roles: ['Admin'],
        },
    ]
};

const projectAppRoutes = {
    path: '/apps/projects',
    name: 'Projects',
    icon: FeatherIcon.Briefcase,
    children: [
        {
            path: '/apps/projects/list',
            name: 'List',
            component: ProjectList,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/apps/projects/detail',
            name: 'Detail',
            component: ProjectDetail,
            route: PrivateRoute,
            roles: ['Admin'],
        },
    ]
};

const taskAppRoutes = {
    path: '/apps/tasks',
    name: 'Tasks',
    icon: FeatherIcon.Bookmark,
    children: [
        {
            path: '/apps/tasks/list',
            name: 'List',
            component: TaskList,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/apps/tasks/board',
            name: 'Board',
            component: TaskBoard,
            route: PrivateRoute,
            roles: ['Admin'],
        },
    ],
};

const appRoutes = [calendarAppRoutes, emailAppRoutes, projectAppRoutes, taskAppRoutes];*/



// pages
/*const pagesRoutes = {
    path: '/pages',
    name: 'Pages',
    header: 'Custom',
    icon: FeatherIcon.FileText,
    children: [
        {
            path: '/pages/starter',
            name: 'Starter',
            component: Starter,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/pages/profile',
            name: 'Profile',
            component: Profile,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/pages/activity',
            name: 'Activity',
            component: Activity,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/pages/invoice',
            name: 'Invoice',
            component: Invoice,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/pages/pricing',
            name: 'Pricing',
            component: Pricing,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/pages/error-404',
            name: 'Error 404',
            component: Error404,
            route: Route
        },
        {
            path: '/pages/error-500',
            name: 'Error 500',
            component: Error500,
            route: Route
        },
    ]
};*/


// components
const componentsRoutes = {
    path: '/ui',
    name: 'UI Elements',
    header: 'Components',
    icon: FeatherIcon.Package,
    children: [
        {
            path: '/ui/bscomponents',
            name: 'Bootstrap UI',
            component: BSComponents,
            route: PrivateRoute,
            roles: ['Admin'],
        },
        {
            path: '/ui/icons',
            name: 'Icons',
            children: [
                {
                    path: '/ui/icons/feather',
                    name: 'Feather Icons',
                    component: FeatherIcons,
                    route: PrivateRoute,
                    roles: ['Admin'],
                },
                {
                    path: '/ui/icons/unicons',
                    name: 'Unicons Icons',
                    component: UniconsIcons,
                    route: PrivateRoute,
                    roles: ['Admin'],
                },
            ]
        },
        {
            path: '/ui/widgets',
            name: 'Widgets',
            component: Widgets,
            route: PrivateRoute,
            roles: ['Admin'],
        },

    ]
};

// charts
const chartRoutes = {
    path: '/charts',
    name: 'Charts',
    component: Charts,
    icon: FeatherIcon.PieChart,
    roles: ['Admin'],
    route: PrivateRoute
}


// forms
const formsRoutes = {
    path: '/forms',
    name: 'Forms',
    icon: FeatherIcon.FileText,
    children: [
        {
            path: '/forms/basic',
            name: 'Basic Elements',
            component: BasicForms,
            route: PrivateRoute,
        },
        {
            path: '/forms/advanced',
            name: 'Advanced',
            component: FormAdvanced,
            route: PrivateRoute,
        },
        {
            path: '/forms/validation',
            name: 'Validation',
            component: FormValidation,
            route: PrivateRoute,
        },
        {
            path: '/forms/wizard',
            name: 'Wizard',
            component: FormWizard,
            route: PrivateRoute,
        },
        {
            path: '/forms/editor',
            name: 'Editor',
            component: Editor,
            route: PrivateRoute,
        },
        {
            path: '/forms/upload',
            name: 'File Upload',
            component: FileUpload,
            route: PrivateRoute,
        }
    ]
};


const tableRoutes = {
    path: '/tables',
    name: 'Tables',
    icon: FeatherIcon.Grid,
    children: [
        {
            path: '/tables/basic',
            name: 'Basic',
            component: BasicTables,
            route: PrivateRoute,
        },
        {
            path: '/tables/advanced',
            name: 'Advanced',
            component: AdvancedTables,
            route: PrivateRoute,
        }]
};


// auth
/*const authRoutes = {
    path: '/account',
    name: 'Auth',
    children: [
        {
            path: '/account/login',
            name: 'Login',
            component: Login,
            route: Route,
        },
        {
            path: '/account/logout',
            name: 'Logout',
            component: Logout,
            route: Route,
        },
        {
            path: '/account/register',
            name: 'Register',
            component: Register,
            route: Route,
        },
        {
            path: '/account/confirm',
            name: 'Confirm',
            component: Confirm,
            route: Route,
        },
        {
            path: '/account/forget-password',
            name: 'Forget Password',
            component: ForgetPassword,
            route: Route,
        },
    ],
};
*/
// flatten the list of all nested routes
const flattenRoutes = routes => {
    let flatRoutes = [];

    routes = routes || [];
    routes.forEach(item => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

// All routes
const allRoutes = [
    rootRoute,
    dashboardRoutes,
    //dashboardoldRoutes,
    sucursalesRoutes,
    puestosRoutes,
    DepartamentosRoutes,
    EmpleadosRoutes,
    CentrosTrabajoRoutes,
 
    EncuestosRoutes,
    ProgramacionDeEventosRoutes,
    ReportesRoutes,
    OrgainzacionRoutes,
    //...appRoutes,
    //pagesRoutes,
    componentsRoutes,
    chartRoutes,
    formsRoutes,
    tableRoutes,
    authRoutes,
    ErrorRoutes,
    ReporteGlobalRoutes,
    ReporteGlobalPDFRoutes,
    ReporteIndividualRoutes,
    ReporteIndividualPDFRoutes
];

const authProtectedRoutes = [
    dashboardRoutes, 
    sucursalesRoutes, 
    puestosRoutes, 
    DepartamentosRoutes, 
    EmpleadosRoutes, 
    CentrosTrabajoRoutes,
    ReporteGlobalRoutes,
    ReporteIndividualRoutes
    //EncuestosRoutes, 
    //ProgramacionDeEventosRoutes, 
    //ReportesRoutes,
    //...appRoutes, 
    //pagesRoutes, 
    //componentsRoutes, 
    //chartRoutes, 
    //formsRoutes, 
    //tableRoutes
];

const allFlattenRoutes = flattenRoutes(allRoutes);
export { allRoutes, authProtectedRoutes, allFlattenRoutes };
