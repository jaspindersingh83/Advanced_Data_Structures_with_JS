#include<stdio.h>
#include<stdlib.h>

struct node {
    int val;
    struct node* left; 
    struct node* right; 
};

struct node *newNode(int item){
    struct node *result = (struct node *)malloc(sizeof(struct node));
    result->val = item;
    result->left = NULL;
    result->right = NULL;
    return result;
}

struct node* insert(struct node* root, int item) {
    if(root == NULL){
        root = newNode(item);
    }
    if(item < root->val){
       root->left= insert(root->left, item);
    }
    if(item > root->val)
    {
        root->right = insert(root->right, item);
    }
    return root;
}

void preorder(struct node * root){
    //preorder
    if(!root){
        return;
    }
    printf("Preorder %d\n", root->val);
    preorder(root->left);
    preorder(root->right);
}
void inorder(struct node * root){
    if(!root)
    {
        return;
    }
    inorder(root->left);
    printf("Inorder %d\n", root->val);
    inorder(root->right);
}

void postorder(struct node * root){
    if(!root)
    {
        return;
    }
    postorder(root->left);
    postorder(root->right);
    printf("postorder %d\n", root->val);
}

int main(){
    struct node *root = NULL;
    root = insert(root, 1);
    insert(root,2);
    insert(root, 5);
    insert(root, 3);
    insert(root, 6);
    insert(root, 4);
    preorder(root);
    inorder(root);
    postorder(root);
    return 0;
}