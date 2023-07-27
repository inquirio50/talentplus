import { ADMIN_ROLE, JOB_REMOTE, JOB_OFFICE, JOB_HYBRID } from '../../config/constants';
import i18n from '../../config/i18next';

export const TYPE_SKILLS_OPTIONS = 'TYPE_SKILLS_OPTIONS';
export const TYPE_MONTH_OPTIONS = 'TYPE_MONTH_OPTIONS';
export const TYPE_YEAR_OPTIONS = 'TYPE_YEAR_OPTIONS';
export const TYPE_SIZE_OPTIONS = 'TYPE_SIZE_OPTIONS';
export const DURATION_TIME_OPTIONS = 'DURATION_TIME_OPTIONS';
export const DURATION_INTERVAL_OPTIONS = 'DURATION_INTERVAL_OPTIONS';
export const EXPERIENCE_OPTIONS = 'EXPERIENCE_OPTIONS';
export const TYPE_OF_WORK_OPTIONS = 'TYPE_OF_WORK_OPTIONS';
export const ROLE_OPTIONS = 'ROLE_OPTIONS';
export const PREFERED_CONTRACT_DURATION_OPTIONS = 'PREFERED_CONTRACT_DURATION_OPTIONS';
export const LEVEL_LANGUAGE_OPTIONS = 'LEVEL_LANGUAGE_OPTIONS';
export const WORK_DISTANCE_OPTIONS = 'WORK_DISTANCE_OPTIONS';
export const TYPE_BENEFITS = 'TYPE_BENEFITS';
export const TYPE_NOTIFICATION = 'TYPE_NOTIFICATION';
export const TYPE_CURRENT_STATUS = 'TYPE_CURRENT_STATUS';

export interface CommonTypeOptions {
    label: string;
    value: string;
}

const skillOptions: string[] = [
    'ACID transaction concepts (safe transaction principles in Delta lakes) ',
    'Ada',
    'Adobe XD',
    'Agile Methodology',
    'AI models',
    'aiohttp',
    'Ajax',
    'Alibaba Cloud',
    'Amazon Beanstalk',
    'Amazon Cloudfront',
    'Amazon EC2',
    'Amazon Elastic MapReduce (EMR)',
    'Amazon RDS',
    'Amazon Redshift',
    'Amazon S3',
    'Amazon SNS',
    'Amazon VPC',
    'Angular JS',
    'Ansible',
    'Anthos',
    'Apache Ant',
    'Apache Camel',
    'App Engine',
    'AR',
    'Artificial Intelligence',
    'Asana',
    'Assembly',
    'Atlassian Suite',
    'Atoum',
    'Audio containers / Video containers',
    'Auth0',
    'Automation',
    'AWS Autoscaling',
    'AWS Elastic cache',
    'AWS Glue',
    'AWS Lambda',
    'AWS',
    'Azure Blob Studio',
    'Azure DevOps',
    'Azure Grid',
    'Azure HDinsight',
    'Azure Ping',
    'Azure',
    'Backbone.js',
    'Bamboo',
    'Bash',
    'BDD/TDD',
    'Beego',
    'Behat',
    'Beyond Trust',
    'BGP et OSPF',
    'BI / Data Visualization tools',
    'Big Query',
    'Big Table',
    'Biocomputing / Biomedical Engineering',
    'Bitbucket',
    'Blob Storage',
    'Blockchain standards',
    'Bootstrap',
    'Bower',
    'Browserify',
    'Buildmaster',
    'C',
    'C#',
    'C++',
    'Caching',
    'CakePHP',
    'Canvas',
    'Cascade methodology',
    'CasperJS',
    'Cassandra',
    'Catalyst',
    'CCNA certification',
    'CCNP certification',
    'CDN',
    'Cent-OS',
    'Chaos',
    'Chef',
    'CI/CD',
    'Circle CI',
    'CISA certification',
    'Cisco',
    'Client management / Internal business lines',
    'Clojure',
    'Cloud Combine',
    'Cloud computing',
    'Cloud Computing',
    'Cloud Explorer',
    'Cloud Foundry',
    'Cloud Margin',
    'Cloud Run',
    'Cloud Serverless Infrastructure',
    'Cloud Spanner',
    'Cloudera',
    'Cobol',
    'Codacy',
    'Code Reuse methodo.',
    'Codeception',
    'Coding',
    'CoffeeScript',
    'Complex problem solving',
    'Complex queries commands',
    'Compute Engine',
    'Confluence',
    'Container orchestration',
    'Cost effective decision model planning',
    'Couchbase DB',
    'CouchbaseDB',
    'Coverity',
    'CSS',
    'Cuba',
    'Cucumber',
    "Customs API's",
    'CyberArk',
    'Cypress',
    'D365',
    'DaaS / Desktop Virtualization',
    'Dancer',
    'Dart',
    'Data Cloud Engineering tool / Data Cloud Platform / Data Virtualization tools (data management)',
    'Data Lake',
    'Data modelling',
    'Data pipeline aggregation builder',
    'Data pipeline',
    'Data Warehouse',
    'Database management',
    'Databricks',
    'Datadog',
    'DAX',
    'Deeplearning models',
    'Denodo',
    'Design',
    'Develop documentation from : code to functional / business requirements',
    'Development of training material ',
    'DIACC',
    'Digital Ocean',
    'Django',
    'Docker',
    'Dotnet core',
    'Dotnet',
    'Drupal',
    'DRY',
    'Dynamics AX',
    'Dynamics GP',
    'Dynatrace',
    'Eclipse',
    'EcmaScript',
    'Elastic Search',
    'Ember.js',
    'Encryption',
    'Enterprise Service Bus',
    'Entity Framework',
    'ERP',
    'ESXi',
    'ETL / ELT (Data Ingestion / Acquisition)',
    'Express.js',
    'F#',
    'Filemaker',
    'Filestore',
    'Finch',
    'Fivetran',
    'Flask',
    'Flutter',
    'FME',
    'Fortran',
    'FuelPHP',
    'Full SDLC',
    'GCC',
    'Gdb',
    'GED / EIM',
    'Genesis Global',
    'Gin Gonic',
    'GIS',
    'Git',
    'Github',
    'Gitlab',
    'Goji',
    'Google Analytics',
    'Google Cloud Platform',
    'Google Cloud Storage',
    'Gradle',
    'Grails',
    'Graph Engine ',
    'Graphite',
    'GraphQL',
    'GRASP',
    'Groovy',
    'Grunt',
    'Gulp',
    'GWT',
    'Hadoop',
    'Hanami',
    'HAproxy',
    'Hardware deployment',
    'Hashicorp',
    'Haxe',
    'Hbase',
    'Hibernate',
    'Hive',
    'Homebrew',
    'HTML',
    'HTTPS',
    'Hyper-V',
    'IaaS',
    'IAM',
    'IBM Cloud',
    'IBM Cognos',
    'IBM Data Stage',
    'IBMi',
    'IIS',
    'Informatica power center',
    'Information Security',
    'Inheritance',
    'Integrate.io',
    'Ionic',
    'IoT',
    'Java',
    'Javascript',
    'JEE',
    'Jest',
    'Jfrog',
    'Jira',
    'Jmeter',
    'Joomla',
    'Jquery',
    'JSE',
    'JSF',
    'JSLint, TSLint, ESLint and ESH Lint',
    'JSON-RPC',
    'JSP',
    'Julia',
    'Junit',
    'Kafka',
    'Kanban methodology',
    'Karma',
    'Katalon',
    'Kibana',
    'Kotlin',
    'Ktor',
    'Kubernetes',
    'LAN WAN',
    'Laravel',
    'Legacy code to modern, with strategic planning',
    'LESS or SASS (Pre-processors)',
    'Lift',
    'LinQ',
    'Linux Systems',
    'Liquid',
    'Load Balancing Algorithms',
    'Load Balancing tools',
    'Loadrunner',
    'Lodash',
    'Logstash',
    'Lumen',
    'M365 O365',
    'Machine Learning',
    'MacOS',
    'Magento',
    'Mainframe',
    'Maria DB',
    'Martini',
    'Maven',
    'MEMCM',
    'Mercurial',
    'Mesos',
    'Meteor.js',
    'Micro Strategy',
    'Microsoft Azure',
    'Middleware',
    'ML models',
    'MochaJS',
    'Moment.js',
    'Mongo DB',
    'Mono',
    'Moose',
    'MPEG 2-TS',
    'MPEG',
    'MPLS protocols',
    'MSSQL',
    'Murex',
    'MyFaces',
    'MySQL',
    'Nagios',
    'Neo4J',
    'Nette',
    'Network configuration',
    'New Relic',
    'NFT standard',
    'NISST',
    'NLP',
    'Node.js',
    'Non-relational database',
    'NPL',
    'NPM',
    'NuGet',
    'Nunit',
    'OBIEE',
    'Object Oriented programming',
    'Objective-C',
    'OLAP',
    'OLTP',
    'Open API/ Public API/ REST API/ RESTful APIs/ ',
    'OpenID',
    'Openshift',
    'Opentext',
    'Operating system knowledge',
    'Oracle Big Data Cloud',
    'Oracle Cloud',
    'Oracle Golden Gate',
    'Oracle',
    'PaaS et SaaS',
    'PagerDuty',
    'Palo Olap Server',
    'Pascal',
    'Perforce',
    'Performance testing frameworks',
    'Performance Testing',
    'Performance tuning (data)',
    'Perl',
    'Persistent Disk',
    'Phalcon',
    'PL SQL',
    'Play',
    'Postman',
    'Power BI',
    'PowerBI',
    'Powershell',
    'Preact',
    'Protocol authorization and Authentication process',
    'Protocols',
    'Prototyping',
    'PUBLIC API',
    'Puppet',
    'Puppeteer',
    'Pyspark',
    'Python',
    'Qlik replicate',
    'QT',
    'Quarkus',
    'R',
    'RabbitMQ',
    'Rails',
    'React Native',
    'React.js',
    'ReadyAPI',
    'Red Hat',
    'Redis',
    'Redux',
    'Regression Testing',
    'Relational database',
    'Resharper',
    'Restful (REST) API',
    'Revel',
    'RTP RTSP',
    'Salesforce',
    'SAN switch',
    'Sanity Testing',
    'SAP AG',
    'SAP data services',
    'SAP',
    'SAS Data Management',
    'SASS',
    'Scala',
    'Scripting',
    'Scriptshell',
    'ScrumBan methodology',
    'SDK',
    'Security Testing',
    'Selenium',
    'Serverless expertise / IaC',
    'Sharepoint',
    'Shell',
    'Shopify',
    'SignalR',
    'Sinatra',
    'Slim',
    'Snowflake',
    'SOAP API',
    'SOAP UI',
    'Social media management',
    'Solarwinds',
    'SOLID methodoly / Clean code',
    'Solr',
    'Sonarqube',
    'Soteria',
    'Spark',
    'Splunk',
    'Spring Boot',
    'Spring Cloud',
    'Spring Data',
    'Spring Security',
    'Spring',
    'SQL Database Migration Wizard',
    'SQLite',
    'SSAS',
    'SSIS',
    'SSMS',
    'SSRS',
    'Storm',
    'Streaming protocols',
    'Styling / Linter',
    'Svelte.js',
    'SVN',
    'Symfony',
    'Synopsys',
    'Synthetic data development',
    'T-SQL',
    'Tableau',
    'Talend Data Fabric',
    'TCP/IP',
    'Team management',
    'Technical writing',
    'Telecommunication',
    'Teradatavantage',
    'Terraform',
    'TFS',
    'Tibco Messaging',
    'TOGAF',
    'Tokenization',
    'Tomcat',
    'Travis CI',
    'Typescript',
    'Ubuntu',
    'UFT one',
    'Uglify',
    'UML',
    'Underscore',
    'Unity',
    'Unix Server',
    'UWP',
    'UX and UI research',
    'Vanilla',
    'Vault',
    'vCloud Director',
    'Veeam',
    'Version control',
    'Vert.x',
    'Virtualisation',
    'Virtualization tools',
    'Vision',
    'Vmware',
    'VR',
    'vSphere',
    'Vue.js',
    'Web API',
    'Web2py',
    'Webpack',
    'Weld',
    'Windows Server',
    'Windows XP',
    'Winform',
    'Wordpress',
    'Workday',
    'WPF',
    'x86',
    'Xamarin',
    'Xilinx',
    'XML',
    'xUnit',
    'Xymon',
    'YAGNI',
    'YAML',
    'Yarn',
    'Yii',
    'Zabbix',
    'Zend',
    'Zenoss',
];

const monthOptions: CommonTypeOptions[] = [
    { value: '1', label: i18n.t('January') },
    { value: '2', label: i18n.t('February') },
    { value: '3', label: i18n.t('March') },
    { value: '4', label: i18n.t('April') },
    { value: '5', label: i18n.t('May') },
    { value: '6', label: i18n.t('June') },
    { value: '7', label: i18n.t('July') },
    { value: '8', label: i18n.t('August') },
    { value: '9', label: i18n.t('September') },
    { value: '10', label: i18n.t('October') },
    { value: '11', label: i18n.t('November') },
    { value: '12', label: i18n.t('December') },
];

const sizeOptions: CommonTypeOptions[] = [
    { value: 'micro', label: i18n.t('microenterprises') },
    { value: 'small', label: i18n.t('small') },
    { value: 'medium', label: i18n.t('medium') },
    { value: 'large', label: i18n.t('large') },
];

const durationNumberOptions: CommonTypeOptions[] = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' },
];

const durationIntervalOptions = (translate: any): CommonTypeOptions[] => [
    { value: 'year', label: translate('year') },
    { value: 'month', label: translate('month') },
];

const experienceOptions = (translate: any): CommonTypeOptions[] => [
    { value: '02years', label: translate('02years') },
    { value: '25years', label: translate('25years') },
    { value: '59years', label: translate('59years') },
    { value: '10years', label: translate('10AndMoreYears') },
];

const contractDurationPreper = (translate: any): CommonTypeOptions[] => [
    { value: '3', label: translate('3months') },
    { value: '6', label: translate('6months') },
    { value: '9', label: translate('9months') },
    { value: '12', label: translate('12months') },
    { value: '24', label: translate('24months') },
    { value: '0', label: translate('IDontMind') },
];

export const typeOfWorkOptions = (translate: any): CommonTypeOptions[] => [
    { value: JOB_OFFICE, label: translate('Office') },
    { value: JOB_REMOTE, label: translate('Remote') },
    { value: JOB_HYBRID, label: translate('Hybrid') },
];

export const levelLanguage = (translate: any): CommonTypeOptions[] => [
    { value: '0', label: translate('IdontSpeak') },
    { value: '1', label: translate('IUnderstandWithDifficult') },
    { value: '2', label: translate('IUnderstandbit') },
    { value: '3', label: translate('ICanChat') },
    { value: '4', label: translate('IQuiteComfortable') },
    { value: '5', label: translate('ItsFirstLanguage') },
];

const workDistance = (translate: any): CommonTypeOptions[] => [
    { value: '1', label: translate('0to20minutes') },
    { value: '2', label: translate('21to40minutes') },
    { value: '3', label: translate('41to60minutes') },
    { value: '4', label: translate('60minutesMore') },
    { value: '5', label: translate('IDontMind') },
];

const benefitsList = (translate: any): CommonTypeOptions[] => [
    { value: '1', label: translate('benefits1') },
    { value: '2', label: translate('benefits2') },
    { value: '3', label: translate('benefits3') },
    { value: '4', label: translate('benefits4') },
    { value: '5', label: translate('benefits5') },
    { value: '6', label: translate('benefits6') },
    { value: '7', label: translate('benefits7') },
    { value: '8', label: translate('benefits8') },
    { value: '9', label: translate('benefits9') },
    { value: '10', label: translate('benefits10') },
];

const typeNotifications = (translate: any): CommonTypeOptions[] => [
    { value: 'text', label: translate('text') },
    { value: 'email', label: translate('email') },
];

const typeCurrentStatus = (translate: any): CommonTypeOptions[] => [
    { value: 'looking', label: translate('ImLooking') },
    { value: 'searching', label: translate('ImSearching') },
    { value: 'flex', label: translate('ImSearchingFlex') },
    { value: 'opportunity', label: translate('IneedOportunity') },
];

export const roleOptions: CommonTypeOptions[] = [{ value: ADMIN_ROLE, label: i18n.t('admin') }];

const createYearOptions = (): any[] => {
    const options: any[] = [];
    const yr = Number(new Date().getFullYear());
    for (let i = yr; i >= 1900; i -= 1) {
        const opt = { label: i18n.t(i.toString()), value: i18n.t(i.toString()) };
        options.push(opt);
    }
    return options;
};

const generateOptionLabel = (arrayOptions: string[]): any[] => {
    const labeledOptions: any[] = [];
    arrayOptions.forEach((element) => {
        const opt: CommonTypeOptions = { label: element, value: element };
        labeledOptions.push(opt);
    });
    return labeledOptions;
};

export const getOptionsLabeled = (type: string, translate?: any): CommonTypeOptions[] => {
    switch (type) {
        case TYPE_MONTH_OPTIONS: {
            return monthOptions;
        }
        case TYPE_SKILLS_OPTIONS: {
            return generateOptionLabel(skillOptions);
        }
        case TYPE_SIZE_OPTIONS: {
            return sizeOptions;
        }
        case TYPE_YEAR_OPTIONS: {
            return createYearOptions();
        }
        case DURATION_TIME_OPTIONS: {
            return durationNumberOptions;
        }
        case DURATION_INTERVAL_OPTIONS: {
            return durationIntervalOptions(translate);
        }
        case EXPERIENCE_OPTIONS: {
            return experienceOptions(translate);
        }
        case TYPE_OF_WORK_OPTIONS: {
            return typeOfWorkOptions(translate);
        }
        case ROLE_OPTIONS: {
            return roleOptions;
        }
        case PREFERED_CONTRACT_DURATION_OPTIONS: {
            return contractDurationPreper(translate);
        }
        case LEVEL_LANGUAGE_OPTIONS: {
            return levelLanguage(translate);
        }
        case WORK_DISTANCE_OPTIONS: {
            return workDistance(translate);
        }
        case TYPE_BENEFITS: {
            return benefitsList(translate);
        }
        case TYPE_NOTIFICATION: {
            return typeNotifications(translate);
        }
        case TYPE_CURRENT_STATUS: {
            return typeCurrentStatus(translate);
        }
        default:
            break;
    }
    return [];
};
