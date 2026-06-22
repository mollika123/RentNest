'use server'

import { serverMutation } from "../core/server";

export const createAgency = async (newCompanyData) => {
    return serverMutation('/api/agency', newCompanyData);
}