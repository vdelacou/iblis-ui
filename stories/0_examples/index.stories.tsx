import { Store, withState } from '@dump247/storybook-state';
import { AccountBox, AccountCircle, Dashboard, Home, PowerSettingsNew, ViewList } from '@material-ui/icons';
import { action } from '@storybook/addon-actions';
import { RenderFunction, storiesOf } from '@storybook/react';
import * as React from 'react';
import { ConfigProps, reduxForm } from 'redux-form';
import { Grid } from '../../node_modules/@material-ui/core';
import {
    AccountCard, AccountMenu, //
    CardMenu, CardMenuProps, CardTitleLayout, //
    ChangePasswordForm, ChangePasswordFormProps, ChangePasswordFormValues, //
    ContentWithTitle, //
    DeleteAccountForm, DeleteAccountFormProps, DeleteAccountFormValues, //
    EmptyPage, //
    FooterMenu, FooterMenuLevelProps, FooterMenuProps, IblisSnackbar, //
    MainLayout, MainMenu, MainMenuProps, ManagedAddSimpleFormProps, ManagedAddSimpleFormValues, ManagedSimpleForm, ManagedSimpleFormData, ManagedSimpleFormProps, //
    UploadAvatar, UserProfileForm, //
    UserProfileFormProps, UserProfileFormValues
} from '../../src';
import { injectProvider, injectThemeWithoutLimitWidth } from '../decorators';

interface State {
    firstLevelActive: number;
    secondLevelActive: number;
    user: {
        firstName: string;
        lastName: string;
        email: string;
        language: string;
        avatarUrl: string;
        avatarFileId: string | number;
        updateUserisLoading: boolean;
    };
    categories: Array<ManagedSimpleFormData<{ id: string | number; name: string }>>;
    categoriesLoading: boolean;
    accountMembers: Array<ManagedSimpleFormData<{ id: string | number; email: string }>>;
    accountMembersLoading: boolean;
    accountLevelActive: number;
    errorMessage: string;
    changePasswordLoading: boolean;
    deleteAccountLoading: boolean;
}

const langValues = [{ id: 'en', value: 'English' }, { id: 'fr', value: 'French' }];

export default storiesOf('0 Examples', module)
    .addDecorator((story: RenderFunction) => {
        return (
            injectThemeWithoutLimitWidth(story)
        );
    })
    .addDecorator((story: RenderFunction) => {
        return (
            injectProvider(story)
        );
    })
    //
    .add('Full Example', withState(
        {
            firstLevelActive: 0,
            secondLevelActive: 0,
            user: {
                firstName: 'Albert',
                lastName: 'Einstein',
                email: 'albert@einstein.com',
                language: 'en',
                avatarUrl: 'https://pickaface.net/gallery/avatar/unr_alberteinstein_161028_1839_7f2a2to8.png',
                avatarFileId: 0,
                updateUserisLoading: false,
            },
            categories: [
                { entity: { id: '1', name: 'Utilities' } },
                { entity: { id: '2', name: 'Travel' } },
                { entity: { id: '3', name: 'Rent' } },
                { entity: { id: '4', name: 'Office supplies' } },
            ],
            categoriesLoading: false,
            accountMembers: [],
            accountMembersLoading: false,
            accountLevelActive: 0,
            errorMessage: undefined,
            changePasswordLoading: false,
            deleteAccountLoading: false,
        }
    )((story: any) => {
        const store: Store<State> = story.store as Store<State>;

        return (
            <div>
                <MainLayout
                    menuComponent={mainMenu(store)}
                    footerComponent={(footerMenu())}
                >
                    {chooseContent(store, store.state.firstLevelActive, store.state.secondLevelActive)}
                </MainLayout>
                <IblisSnackbar
                    isError={Boolean(store.state.errorMessage)}
                    errorText={store.state.errorMessage}
                    hide={() => store.set({ errorMessage: undefined })}
                />
            </div>
        );
    }
    ))
    //
    ;

/**
 *  Navigation
 */
const navigate = (store: Store<State>, firstLevelActive: number, secondLevelActive: number) => {
    store.set({ firstLevelActive: firstLevelActive, secondLevelActive: secondLevelActive, accountLevelActive: 0 });
};

const chooseContent = (store: Store<State>, firstLevelActive: number, secondLevelActive: number) => {
    switch (firstLevelActive) {
        case 1:
            switch (secondLevelActive) {
                case 0:
                    return renderAccount(store);
                case 1:
                    return renderCategory(store);
                default:
                    return (<EmptyPage />);
            }
        default:
            return (<EmptyPage />);
    }
    return (<EmptyPage />);
};

/**
 *  Layout
 */
const footerMenu = () => {

    const footerMenuLevelProps: FooterMenuLevelProps[] = [
        { name: 'Home', action: () => window.open('https://github.com/vdelacou/iblis-ui', '_blank') },
        { name: 'Legal & Privacy', action: () => window.open('https://github.com/vdelacou/iblis-ui/blob/master/LICENSE', '_blank') },
    ];

    const footerMenuProps: FooterMenuProps = {
        rightText: `© ${new Date().getFullYear()} Iblis`,
        menu: footerMenuLevelProps,
    };

    return (
        <FooterMenu {...footerMenuProps} />
    );
};

const mainMenu = (store: Store<State>) => {

    const menu = [
        {
            firstLevel: { name: 'Home', action: () => navigate(store, 0, 0), icon: < Home /> },
            sublevel: [
                { name: 'DashBoard', action: () => navigate(store, 0, 0), icon: < Dashboard /> },
            ],
        },
        {
            firstLevel: { name: 'Account', action: () => navigate(store, 1, 0), icon: <AccountCircle /> },
            sublevel: [
                { name: 'Account', action: () => navigate(store, 1, 0), icon: < AccountBox /> },
                { name: 'Categories', action: () => navigate(store, 1, 1), icon: < ViewList /> },
                // { name: 'Billing & Subscriptions', action: () => navigate(store, 1, 2), icon: <Receipt /> },
            ],
        },
    ];

    const mainMenuProps: MainMenuProps = {
        mainTitle: 'Iblis',
        menu: menu,
        firstLevelActive: store.state.firstLevelActive,
        secondLevelActive: store.state.secondLevelActive,
        lastMenuComponent: accountMenu(store),
        mainTitleAction: () => navigate(store, 0, 0),
    };

    return (
        <MainMenu {...mainMenuProps} />
    );
};

const accountMenu = (store: Store<State>) => {

    const accountComponent = (
        <AccountCard
            avatarUrl={store.state.user.avatarUrl}
            email={store.state.user.email}
            firstName={store.state.user.firstName}
            lastName={store.state.user.lastName}
            buttonText="My Account"
            buttonAction={() => navigate(store, 1, 0)}
        />);

    const menu = [
        { name: 'Categories', action: () => navigate(store, 1, 1), icon: < ViewList /> },
        // { name: 'Billing & Subscriptions', action: () => navigate(store, 1, 2), icon: <Receipt /> },
    ];

    return (
        <AccountMenu
            accountComponent={accountComponent}
            accountMenu={menu}
            signOutText="Sign Out"
            signOutIcon={<PowerSettingsNew />}
            signOutAction={action('Sign out clicked')}
        />
    );
};

/**
 *  Account Page
 */

const navigateAccount = (store: Store<State>, accountLevelActive: number) => {
    store.set({ accountLevelActive: accountLevelActive });
};

const chooseContentAccount = (store: Store<State>, accountLevelActive: number) => {
    switch (accountLevelActive) {
        case 0:
            return profile(store);
        case 1:
            return renderAccountMenbers(store);
        default:
            return (<EmptyPage />);
    }
    return (<EmptyPage />);
};

const renderAccount = (store: Store<State>) => {
    const subMenu = [
        {
            firstLevel: { name: 'My Profile', action: () => navigateAccount(store, 0) },
        },
        {
            firstLevel: { name: 'Account Members', action: () => navigateAccount(store, 1) },
        },
    ];

    const cardMenuProps: CardMenuProps = {
        menu: subMenu,
        firstLevelActive: store.state.accountLevelActive,
    };

    return (
        <CardMenu {...cardMenuProps}>
            {chooseContentAccount(store, store.state.accountLevelActive)}
        </CardMenu>
    );
};

const profile = (store: Store<State>) => {
    return (
        <div>
            <ContentWithTitle
                title={'User Profile'}
            >
                {userForm(store)}
            </ContentWithTitle>
            <ContentWithTitle
                title={'Change Password'}
            >
                {changePasswordForm(store)}
            </ContentWithTitle>
            <ContentWithTitle
                title={'Delete Account'}
            >
                {deleteAccountForm(store)}
            </ContentWithTitle>
        </div>
    );
};

const userForm = (store: Store<State>) => {

    function config(): ConfigProps<UserProfileFormValues, UserProfileFormProps> {
        const configForm: ConfigProps<UserProfileFormValues, UserProfileFormProps> = {
            form: 'userForm',
        };
        return configForm;
    }

    const uploadAvatarImage = (binary: string, file: File) => {
        store.set({ user: { ...store.state.user, updateUserisLoading: true } });
        setTimeout(() => {
            const fileExtensionsSplit = file.name.split('.');
            const fileExtension = fileExtensionsSplit[fileExtensionsSplit.length - 1].toLowerCase();
            const src = `data:${fileExtension};base64,${btoa(binary)}`;
            // update the form with the id
            const avatarFileId = Math.floor(Math.random() * 1000);
            store.set({ user: { ...store.state.user, updateUserisLoading: false, avatarFileId: avatarFileId, avatarUrl: src } });
            const values: UserProfileFormValues = {
                firstName: store.state.user.firstName,
                lastName: store.state.user.lastName,
                email: store.state.user.email,
                language: store.state.user.language,
                avatarFileId: avatarFileId,
            };
            updateUser(values);
        }, 1000);
    };

    const updateUser = (values: UserProfileFormValues) => {
        store.set({ user: { ...store.state.user, updateUserisLoading: true } });
        setTimeout(() => {
            store.set({
                user: {
                    firstName: values.firstName!,
                    lastName: values.lastName!,
                    email: values.email!,
                    language: values.language!,
                    avatarFileId: values.avatarFileId!,
                    updateUserisLoading: false,
                    avatarUrl: store.state.user.avatarUrl,
                },
            }
            );
        }, 1000);
    };

    const uploadAvatar = (
        <UploadAvatar
            buttonLabel={'Select File'}
            onClick={(binary, file) => uploadAvatarImage(binary, file)}
            avatarUrl={store.state.user.avatarUrl}
            captionLabel="Supported file types: JPEG, PNG, GIF, BMP (Max 2 MB)"
            fileType=".jpeg,.jpg,.png,.gif,.bmp"
            fileSize={2}
            handleTypeError={() => store.set({ errorMessage: 'This kind of files is not authorized' })}
            handleSizeError={() => store.set({ errorMessage: 'File too big for upload' })}
        />
    );

    // connect the form
    const ConnectedForm = reduxForm(config())(UserProfileForm);
    const userProfileFormValues: UserProfileFormValues = {
        firstName: store.state.user.firstName,
        lastName: store.state.user.lastName,
        email: store.state.user.email,
        language: store.state.user.language,
        avatarFileId: store.state.user.avatarFileId,
    };
    return (
        <ConnectedForm
            initValues={userProfileFormValues}
            firstNameLabel={'FirstName'}
            lastNameLabel={'LastName'}
            emailLabel={'Email'}
            languageLabel={'Language'}
            buttonLabelConfirm={'Update'}
            requiredErrorLabel={'Required'}
            emailNotValidErrorLabel={'Email not valid'}
            languagePossibleValues={langValues}
            avatarComponent={uploadAvatar}
            isLoading={store.state.user.updateUserisLoading}
            updateUser={(values) => updateUser(values)}
        />
    );
};

const changePasswordForm = (store: Store<State>) => {
    // configure the form
    function config(): ConfigProps<ChangePasswordFormValues, ChangePasswordFormProps> {
        const configForm: ConfigProps<ChangePasswordFormValues, ChangePasswordFormProps> = {
            form: 'changePasswordForm',
        };
        return configForm;
    }

    const setPassword = (_values: ChangePasswordFormValues) => {
        store.set({ changePasswordLoading: true });
        setTimeout(() => {
            store.set({ changePasswordLoading: false });
        }, 1000);
    };

    // connect the form
    const ConnectedForm = reduxForm(config())(ChangePasswordForm);
    return (
        <Grid container={true}>
            <Grid item={true} xs={1}>
                {' '}
            </Grid>
            <Grid item={true} xs={11}>
                <ConnectedForm
                    oldPasswordLabel={'Enter old password'}
                    passwordLabel={'Choose a new password'}
                    passwordAgainLabel={'Re-enter new password'}
                    buttonLabelConfirm={'Change Password'}
                    passwordExplainLabel={'8 or more characters, 1 lower case, 1 upper case, 1 number'}
                    minimumPasswordLength={8}
                    maximumPasswordLength={128}
                    passwordLengthErrorLabel={'Password must be 8 characters minimum'}
                    minimumUppercasePassword={1}
                    minimumUppercaseErrorLabel={'Password must have at least 1 upper case letter'}
                    minimumLowercasePassword={1}
                    minimumLowercaseErrorLabel={'Password must have at least 1 lower case letter'}
                    minimumDigitPassword={1}
                    minimumDigitErrorLabel={'Password must have at least 1 number'}
                    minimumSpecialCharPassword={0}
                    minimumSpecialCharErrorLabel={'Password must have at least 1 special char : $@$!%*#?&'}
                    requiredErrorLabel={'Required'}
                    passwordNotIdentical={'Password must be identical'}
                    setPassword={(values) => setPassword(values)}
                    isLoading={store.state.changePasswordLoading}
                />
            </Grid>
        </Grid>
    );
};

const deleteAccountForm = (store: Store<State>) => {
    // configure the form
    function config(): ConfigProps<DeleteAccountFormValues, DeleteAccountFormProps> {
        const configForm: ConfigProps<DeleteAccountFormValues, DeleteAccountFormProps> = {
            form: 'deleteAccountform',
        };
        return configForm;
    }

    const deleteAccount = (values: DeleteAccountFormValues) => {
        store.set({ deleteAccountLoading: true });
        setTimeout(() => {
            if (values.email !== store.state.user.email) {
                store.set({ errorMessage: 'The email doesn\'t match' });
            }
            store.set({ deleteAccountLoading: false });
        }, 2000);
    };

    // connect the form
    const ConnectedForm = reduxForm(config())(DeleteAccountForm);
    return (
        <Grid container={true}>
            <Grid item={true} xs={1}>
                {' '}
            </Grid>
            <Grid item={true} xs={11}>
                <ConnectedForm
                    leaveCommentsLabel={'We\'d hate to see you go. Would you kindly tell us why, so we can improve?'}
                    checkboxLabel={'Yes, I understand this is not reversible.'}
                    emailLabel={'This CANNOT be undone! If you really want to delete your account, type in the email address of this account to confirm.'}
                    firstButtonLabelConfirm={' Delete My Account'}
                    buttonLabelConfirm={'I understand the consequences Delete my account'}
                    deleteAccount={(values) => deleteAccount(values)}
                    requiredErrorLabel={'Required'}
                    emailNotValidErrorLabel={'Email not valid'}
                    isLoading={store.state.deleteAccountLoading}
                />
            </Grid>
        </Grid>
    );
};

/**
 *  Account Members Page
 */
const renderAccountMenbers = (store: Store<State>) => {

    const addAction = (value: { id: string | number; email: string }) => {
        store.set({ accountMembersLoading: true });
        setTimeout(() => {
            const newData = store.state.accountMembers;
            const entityId = Math.floor(Math.random() * 1000);
            value.id = entityId;
            newData.push({ entity: value, hasEdit: false });
            store.set({ accountMembers: newData, accountMembersLoading: false });
        }, 1000);
    };
    const editAction = (value: { id: string | number; email: string }) => {
        store.set({ accountMembersLoading: true });
        setTimeout(() => {
            const indexObjectToUpdate: number = store.state.accountMembers.findIndex((objectToFind) => objectToFind.entity.id === value.id);
            const objectToUpdate = store.state.accountMembers[indexObjectToUpdate];
            objectToUpdate.entity.email = value.email;
            const updateData = store.state.accountMembers;
            updateData[indexObjectToUpdate] = objectToUpdate;
            store.set({ accountMembers: updateData, accountMembersLoading: false });
        }, 1000);
    };
    const deleteAction = (id: string | number) => {
        store.set({ accountMembersLoading: true });
        setTimeout(() => {
            const indexObjectToDelete: number = store.state.accountMembers.findIndex((objectToFind) => objectToFind.entity.id === id);
            const deleteData = store.state.accountMembers;
            deleteData.splice(indexObjectToDelete, 1);
            store.set({ accountMembers: deleteData, accountMembersLoading: false });
        }, 1000);
    };

    const validateEmail = (value: string, _allValues: ManagedAddSimpleFormValues, _props: ManagedAddSimpleFormProps) => {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            return 'Email not valid';
        }
        return undefined;
    };

    const ManagedSimpleFormOwnProps: ManagedSimpleFormProps = {
        data: store.state.accountMembers,
        idFieldName: 'id',
        displayFieldName: 'email',
        namePlaceHolder: 'New Member Email',
        addAction: (value) => addAction(value as { id: string | number; email: string }),
        editAction: (value) => editAction(value as { id: string | number; email: string }),
        deleteAction: (id) => deleteAction(id),
        isLoading: store.state.accountMembersLoading,
        buttonLabelAdd: 'Create',
        validateAddFunctions: [validateEmail],
    };

    return (
        <ManagedSimpleForm
            {...ManagedSimpleFormOwnProps}
        />
    );
};

/**
 *  Categories Page
 */
const renderCategory = (store: Store<State>) => {

    const addAction = (value: { id: string | number; name: string }) => {
        store.set({ categoriesLoading: true });
        setTimeout(() => {
            const newData = store.state.categories;
            const entityId = Math.floor(Math.random() * 1000);
            value.id = entityId;
            newData.push({ entity: value });
            store.set({ categories: newData, categoriesLoading: false });
        }, 1000);
    };
    const editAction = (value: { id: string | number; name: string }) => {
        store.set({ categoriesLoading: true });
        setTimeout(() => {
            const indexObjectToUpdate: number = store.state.categories.findIndex((objectToFind) => objectToFind.entity.id === value.id);
            const objectToUpdate = store.state.categories[indexObjectToUpdate];
            objectToUpdate.entity.name = value.name;
            const updateData = store.state.categories;
            updateData[indexObjectToUpdate] = objectToUpdate;
            store.set({ categories: updateData, categoriesLoading: false });
        }, 1000);
    };
    const deleteAction = (id: string | number) => {
        store.set({ categoriesLoading: true });
        setTimeout(() => {
            const indexObjectToDelete: number = store.state.categories.findIndex((objectToFind) => objectToFind.entity.id === id);
            const deleteData = store.state.categories;
            deleteData.splice(indexObjectToDelete, 1);
            store.set({ categories: deleteData, categoriesLoading: false });
        }, 1000);
    };

    const ManagedSimpleFormOwnProps: ManagedSimpleFormProps = {
        data: store.state.categories,
        idFieldName: 'id',
        displayFieldName: 'name',
        namePlaceHolder: 'Add a new Category',
        addAction: (value) => addAction(value as { id: string | number; name: string }),
        editAction: (value) => editAction(value as { id: string | number; name: string }),
        deleteAction: (id) => deleteAction(id),
        isLoading: store.state.categoriesLoading,
    };

    return (
        <CardTitleLayout title={'Manage Categories'}>
            <ManagedSimpleForm
                {...ManagedSimpleFormOwnProps}
            />
        </CardTitleLayout>
    );
};
