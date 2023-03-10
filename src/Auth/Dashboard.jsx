import React, { Component } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { AppProvider, Page, Button, Layout, AlphaCard } from "@shopify/polaris";
import ProductList from "../Products/ProductList";
import translations from '@shopify/polaris/locales/en.json';


export class Dashboard extends Component {
  handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("User logged out");
        // redirect the user to the login page after logout
        window.location.href = "/";
      })
      .catch((error) => {
        console.error(`Error logging out user: ${error}`);
      });
  };

  render() {
    return (
      <div>
        <AppProvider i18n={translations}>
          <Page>
            <Layout>
              <Layout.Section>
                <AlphaCard>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button outlined onClick={this.handleLogout}>Log Out</Button>
                  </div>
                  <ProductList />
                </AlphaCard>
              </Layout.Section>
            </Layout>
          </Page>
        </AppProvider>
      </div>
    );
  }
}

export default Dashboard;
