 'use server'
/**
* Interface representing a response containing a Verifiable Presentation (VP) token.
*/
export interface vpResponse {
    vp_token: string;
}

const NAMESPACE_ISO_MDL = 'org.iso.18013.5.1';
 
/**
* Decodes a credential from a given vpResponse and extracts namespaced items.
*
* @param response - The vpResponse object containing the credential to decode.
* @param namespaces - An array of namespace strings to extract from the credential. Defaults to [NAMESPACE_ISO_MDL].
* @returns A Promise that resolves to a Map where each key is a namespace and the value is another Map of signable items.
*
*/
export const decodeCredential = async (response: vpResponse, namespaces: string[] = [NAMESPACE_ISO_MDL]) => {
    const token = Buffer.from(response.vp_token, 'base64');
    const mDoc = parse(token);
    const doc1 = mDoc.documents[0];
    const namespacedItems = new Map();
    namespaces.forEach((namespace) => {
        if (doc1.issuerSigned.nameSpaces[namespace]) {
            const signableItems = new Map<string, any>();
            doc1.issuerSigned.nameSpaces[namespace].forEach((e) => {
                // Convert portrait Uint8Array to base64 string
                if (e.elementIdentifier === 'portrait' && e.elementValue instanceof Uint8Array) {
                    signableItems.set(e.elementIdentifier, Buffer.from(e.elementValue).toString('base64'));
                } else {
                    signableItems.set(e.elementIdentifier, e.elementValue);
                }
            });
            namespacedItems.set(namespace, signableItems);
        } else {
            console.warn(`Namespace ${namespace} not found in the credential.`);
        }
    });
    return namespacedItems;
};
 
import { parse } from '@auth0/mdl';
 